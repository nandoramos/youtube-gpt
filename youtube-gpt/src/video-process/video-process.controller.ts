import { Body, Controller, Post } from "@nestjs/common";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { Task } from "src/tasks/task.entity";
import { VideoProcessService } from "./video-process.service";
import { ConfigService } from "@nestjs/config";
import { OpenaiService } from "src/openai/openai.service";

@Controller("video-process")
export class VideoProcessController {
  constructor(
    private videoProcessService: VideoProcessService,
    private configService: ConfigService,
    private openaiService: OpenaiService
  ) {}

  @Post()
  async test(@Body() body): Promise<string> {
    const { videoId, lang } = body;
    return await this.videoProcessService.processVideo(videoId, lang);
  }
}
