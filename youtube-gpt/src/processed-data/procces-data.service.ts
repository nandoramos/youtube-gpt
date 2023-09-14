import { Injectable } from "@nestjs/common";
import { TranscriptionsRepository } from "./transcriptions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Transcription } from "./transcription.entity";
import { CreateTranscriptionDto } from "./dto/create-transcription.dto";
import { Lang } from "../video-process/dto/process-video.dto";
import { Summary } from "./summary.entity";
import { SummariesRepository } from "./summaries.repository";
import { QuizzesRepository } from "./quizzes.repository";

@Injectable()
export class ProcessDataService {
  constructor(
    @InjectRepository(TranscriptionsRepository)
    private transcriptionsRepository: TranscriptionsRepository,
    @InjectRepository(SummariesRepository)
    private summariesRepository: SummariesRepository,
    @InjectRepository(QuizzesRepository)
    private quizzesRepository: QuizzesRepository
  ) {}

  async getTranscription(videoId): Promise<Transcription> {
    return await this.transcriptionsRepository.getTranscription(videoId);
  }

  async createTranscription(
    createTranscriptionDto: CreateTranscriptionDto
  ): Promise<Transcription> {
    return await this.transcriptionsRepository.createTranscription(
      createTranscriptionDto
    );
  }

  async getSummary(videoId: string, lang: Lang): Promise<Summary> {
    return await this.summariesRepository.getSummary(videoId, lang);
  }

  async createSummary(
    videoId: string,
    text: string,
    lang: Lang
  ): Promise<Summary> {
    return await this.summariesRepository.createSummary(videoId, text, lang);
  }

  async getQuiz(videoId: string, lang: Lang): Promise<Summary> {
    return await this.quizzesRepository.getQuiz(videoId, lang);
  }

  async createQuiz(
    videoId: string,
    text: string,
    lang: Lang
  ): Promise<Summary> {
    return await this.quizzesRepository.createQuiz(videoId, text, lang);
  }

  async getAll(): Promise<Transcription[]> {
    return await this.transcriptionsRepository.getAll();
  }
}
