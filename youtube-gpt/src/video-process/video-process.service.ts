import { OpenaiService } from "src/openai/openai.service";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as ytdl from "ytdl-core";
import { VideoResult } from "./dto/video-result.dto";
import { Lang, ProcessVideo } from "./dto/process-video.dto";
import { TranscriptionsService } from "src/processed-data/transctiptions.service";
import { Transcription } from "src/processed-data/transcription.entity";

@Injectable()
export class VideoProcessService {
  constructor(
    private openaiService: OpenaiService,
    private transcriptionsService: TranscriptionsService
  ) {}

  ignoreSummary = false;

  structure = `{
    q: "question nr 1",
    as: [
      {
        a: "Incorrect answer",
        c: false
      },
      {
        a: "Incorrect answer",
        c: false
      },
      {
        a: "correct answer",
        c: true
      },
    ]
  }`;

  questions = [
    {
      en: "Add a title to this text",
      es: "Puedes generarme un titulo para este texto?",
    },
    {
      en: "give me a 200 words summary to this text",
      es: "Puedes generar un resumen de 200 palabras para este texto?",
    },
    {
      en: `Based on the following text, create a multiple-choice quiz with 4 questions. The questions should follow this format: ${this.structure}`,
      es: `A partir del siguiente texto, crea un quiz de opción múltiple con 4 preguntas. Las preguntas deben seguir este formato: ${this.structure}`,
    },
  ];

  async processVideo(processVideoData: ProcessVideo): Promise<VideoResult> {
    const { videoId, lang } = processVideoData;
    try {
      const transcription = await this.transcribe(videoId, lang);
      const summary = this.ignoreSummary
        ? "lore ipsum"
        : await this.getSummaryFromText(transcription.text, videoId, lang);
      const quiz = await this.getQuizFromText(
        transcription.text,
        videoId,
        lang
      );

      const title = transcription.title;
      const transcriptionText = transcription.text;

      return {
        title,
        transcription: transcriptionText,
        summary,
        quiz,
      } as VideoResult;
    } catch (error) {
      throw new Error("Failed to process video :" + error);
    }
  }

  async transcribe(videoId: string, lang: string): Promise<Transcription> {
    const transcription = await this.transcriptionsService.getTranscription(
      videoId
    );
    if (transcription) {
      console.log(">>> transcription found!");
      return transcription;
    } else {
      console.log("> transcription not found! > Generating transcription");
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      if (!ytdl.validateURL(url)) {
        throw new HttpException("Invalid URL", HttpStatus.BAD_REQUEST);
      }
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;
      const audioFormat = ytdl.chooseFormat(info.formats, {
        filter: "audioonly",
        quality: "highestaudio",
      });
      if (!audioFormat) {
        throw new HttpException("No audio found", HttpStatus.BAD_REQUEST);
      }
      const audioStream = ytdl(url, { format: audioFormat });
      const transcribedText = await this.openaiService.transcribeAudio(
        audioStream,
        videoId
      );

      const newTranscription =
        await this.transcriptionsService.createTranscription({
          videoId,
          title,
          text: transcribedText,
        });

      return newTranscription;
    }
  }

  async getSummaryFromText(
    transcribedText: string,
    videoId: string,
    lang: Lang
  ): Promise<string> {
    const summary = await this.transcriptionsService.getSummary(videoId, lang);
    if (summary) {
      console.log("summary found!");
      return summary.text;
    } else {
      const content = await this.openaiService.getResponseFromOpenAI(
        transcribedText,
        this.questions[1][lang],
        512
      );
      this.transcriptionsService.createSummary(videoId, content, lang);
      return content;
    }
  }

  async getQuizFromText(
    transcribedText: string,
    videoId: string,
    lang: Lang
  ): Promise<string> {
    const quiz = await this.transcriptionsService.getQuiz(videoId, lang);
    if (quiz) {
      console.log("quiz found!");
      return quiz.text;
    } else {
      const content = await this.openaiService.getResponseFromOpenAI(
        transcribedText,
        this.questions[2][lang],
        750
      );
      console.log(content);

      const jsonResults = JSON.stringify(content);

      this.transcriptionsService.createQuiz(videoId, jsonResults, lang);
      return content;
    }
  }

  async getAll(): Promise<Transcription[]> {
    return await this.transcriptionsService.getAll();
  }
}
