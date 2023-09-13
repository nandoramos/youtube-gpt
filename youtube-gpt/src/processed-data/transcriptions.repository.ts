import { EntityRepository, Repository } from "typeorm";
import { Transcription } from "./transcription.entity";
import { CreateTranscriptionDto } from "./dto/create-transcription.dto";

@EntityRepository(Transcription)
export class TranscriptionsRepository extends Repository<Transcription> {


  async getAll(): Promise<Transcription[]> {
    return await this.find();
  }

  async getTranscription(videoId: string): Promise<Transcription> {
    return await this.findOne({ videoId });
  }

  async createTranscription(
    createTranscriptionDto: CreateTranscriptionDto
  ): Promise<Transcription> {
    const { videoId, title, text } = createTranscriptionDto;

    const transcription = this.create({
      videoId,
      title,
      text,
    });

    await this.save(transcription);
    return transcription;
  }
}
