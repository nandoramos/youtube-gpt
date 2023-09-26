import { EntityRepository, Repository } from "typeorm";
import { Lang } from "../video-process/dto/process-video.dto";
import { Quiz } from "./quiz.entity";

@EntityRepository(Quiz)
export class QuizzesRepository extends Repository<Quiz> {

  async getQuiz(videoId: string, lang: Lang): Promise<Quiz> {
    // TODO: here I'm ignoring the language for now, should be updated
    return await this.findOne({ videoId });
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
