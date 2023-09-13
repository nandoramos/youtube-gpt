import { EntityRepository, Repository } from "typeorm";
import { Summary } from "./summary.entity";
import { Lang } from "src/video-process/dto/process-video.dto";

@EntityRepository(Summary)
export class SummariesRepository extends Repository<Summary> {

  async getSummary(videoId: string, lang: Lang): Promise<Summary> {
    return await this.findOne({ videoId, lang});
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
