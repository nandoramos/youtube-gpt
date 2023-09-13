import { EntityRepository, Repository } from "typeorm";
import { Lang } from "src/video-process/dto/process-video.dto";
import { Quiz } from "./quiz.entity";

@EntityRepository(Quiz)
export class QuizzesRepository extends Repository<Quiz> {

  async getQuiz(videoId: string, lang: Lang): Promise<Quiz> {
    return await this.findOne({ videoId, lang });
  }

  async createQuiz(
    videoId: string,
    text: string,
    lang: Lang,
  ): Promise<Quiz> {

    const quiz = this.create({
      videoId,
      text,
      lang,
    });

    await this.save(quiz);
    return quiz;
  }
}
