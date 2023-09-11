import { Body, Controller, Post } from "@nestjs/common";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { Task } from "src/tasks/task.entity";
import { VideoProcessService } from "./video-process.service";
import { ConfigService } from "@nestjs/config";
import { OpenaiService } from "src/openai/openai.service";
import { ProcessVideo } from "./dto/process-video.dto";
import { VideoResult } from "./dto/video-result.dto";

@Controller("video-process")
export class VideoProcessController {
  constructor(
    private videoProcessService: VideoProcessService,
    private configService: ConfigService,
    private openaiService: OpenaiService
  ) {}

  @Post()
  async test(
    @Body() processVideoData: ProcessVideo
  ): Promise<VideoResult> {
    return await this.videoProcessService.processVideo(processVideoData);
  }
}
