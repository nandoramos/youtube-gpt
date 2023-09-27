import { EntityRepository, Repository } from "typeorm";
import { Summary } from "./summary.entity";
import { Lang } from "../video-process/dto/process-video.dto";

@EntityRepository(Summary)
export class SummariesRepository extends Repository<Summary> {

  async getSummary(videoId: string, lang: Lang): Promise<Summary> {
    // TODO: here I'm ignoring the language for now, should be updated
    return await this.findOne({ videoId });
  }

  async createSummary(
    videoId: string,
    text: string,
    lang: Lang,
  ): Promise<Summary> {

    const summary = this.create({
      videoId,
      text,
      lang,
    });

    await this.save(summary);
    return summary;
  }
}
