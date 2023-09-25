import { OpenaiService } from "../openai/openai.service";
import { Injectable, InternalServerErrorException, HttpStatus } from "@nestjs/common";
import * as ytdl from "ytdl-core";
import { VideoResult } from "./dto/video-result.dto";
import { Lang, ProcessVideo } from "./dto/process-video.dto";
import { ProcessDataService } from "../processed-data/procces-data.service";
import { Transcription } from "../processed-data/transcription.entity";

@Injectable()
export class VideoProcessService {
  constructor(
    private openaiService: OpenaiService,
    private processDataService: ProcessDataService
  ) {}

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
      const summary = await this.getSummaryFromText(
        transcription.text,
        videoId,
        lang
      );
      const quiz = await this.getQuizFromText(
        transcription.text,
        videoId,
        lang
      );

      const title = transcription.title;
      const transcriptionText = transcription.text;

      return {
        videoId,
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
    const transcription = await this.processDataService.getTranscription(
      videoId
    );
    if (transcription) {
      return transcription;
    } else {
      try {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        if (!ytdl.validateURL(url)) {
          throw new InternalServerErrorException("Invalid URL" );
        }
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const audioFormat = ytdl.chooseFormat(info.formats, {
          filter: "audioonly",
          quality: "highestaudio",
        });
        if (!audioFormat) {
          throw new InternalServerErrorException("No audio found");
        }
        const audioStream = ytdl(url, { format: audioFormat });
        const transcribedText = await this.openaiService.transcribeAudio(
          audioStream,
          videoId
        );
        const newTranscription =
          await this.processDataService.createTranscription({
            videoId,
            title,
            text: transcribedText,
          });

        return newTranscription;
      } catch (error) {
        throw new InternalServerErrorException("Failed to transcribe video :" + error);
      }
    }
  }

  async getSummaryFromText(
    transcribedText: string,
    videoId: string,
    lang: Lang
  ): Promise<string> {
    const summary = await this.processDataService.getSummary(videoId, lang);
    if (summary) {
      console.log("summary found!");
      return summary.text;
    } else {
      const content = await this.openaiService.getResponseFromOpenAI(
        transcribedText,
        this.questions[1][lang],
        1024
      );
      this.processDataService.createSummary(videoId, content, lang);
      return content;
    }
  }

  async getQuizFromText(
    transcribedText: string,
    videoId: string,
    lang: Lang
  ): Promise<string> {
    const quiz = await this.processDataService.getQuiz(videoId, lang);
    if (quiz) {
      console.log("quiz found!");
      return quiz.text;
    } else {
      const quizGenerated = await this.openaiService.getResponseFromOpenAI(
        transcribedText,
        this.questions[2][lang],
        750
      );
      console.log("quiz generated: " + quizGenerated);
      const stringQuiz = JSON.stringify(quizGenerated);

      this.processDataService.createQuiz(videoId, stringQuiz, lang);
      return quizGenerated;
    }
  }

  async getAll(): Promise<Transcription[]> {
    return await this.processDataService.getAll();
  }
}
