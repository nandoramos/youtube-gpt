import { OpenaiService } from "src/openai/openai.service";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as ytdl from "ytdl-core";
import { VideoResult } from "./dto/video-result.dto";
import { ProcessVideo } from "./dto/process-video.dto";

@Injectable()
export class VideoProcessService {
  constructor(private openaiService: OpenaiService) {}

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
      en: "give me a quiz with 5 multiple options questions taken from the text and the results",
      es: "dame un quiz de 5 preguntas multiple opcion y el resultado relativas al texo que te pase",
    },
  ];

  async processVideo(processVideoData: ProcessVideo): Promise<VideoResult> {
    const { videoId, lang } = processVideoData;
    try {
      const transcription = await this.transcribe(videoId, lang);
      const summary = await this.getSummaryFromText(transcription, lang);
      const quiz = await this.getQuizFromText(transcription, lang);
      return { transcription, summary, quiz } as VideoResult;
    } catch (error) {
      throw new Error("Failed to process video :" + error);
    }
  }

  async transcribe(videoId: string, lang: string): Promise<string> {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    if (!ytdl.validateURL(url)) {
      throw new HttpException("Invalid URL", HttpStatus.BAD_REQUEST);
    }
    const info = await ytdl.getInfo(url);
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
    return transcribedText;
  }

  async getSummaryFromText(transcribedText, lang) {
    const content = await this.openaiService.getResponseFromOpenAI(
      transcribedText,
      this.questions[1][lang],
      512
    );
    return content
      .split("\n\n")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
  }

  async getQuizFromText(transcribedText, lang) {
    const content = await this.openaiService.getResponseFromOpenAI(
      transcribedText,
      this.questions[2][lang],
      512
    );
    console.log(content);
    return content
      .split("\n\n")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
  }
}
