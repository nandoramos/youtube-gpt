import { Body, Controller, Get, Post } from "@nestjs/common";
import { VideoProcessService } from "./video-process.service";
import { ConfigService } from "@nestjs/config";
import { OpenaiService } from "../openai/openai.service";
import { ProcessVideo } from "./dto/process-video.dto";
import { VideoResult } from "./dto/video-result.dto";
import { Transcription } from "../processed-data/transcription.entity";

@Controller("video-process")
export class VideoProcessController {
  constructor(
    private videoProcessService: VideoProcessService,
    private configService: ConfigService,
    private openaiService: OpenaiService
  ) {}


  @Get()
  async GetAll(): Promise<Transcription[]> {
    return await this.videoProcessService.getAll();
  }

  @Post()
  async processVideo(
    @Body() processVideoData: ProcessVideo
  ): Promise<VideoResult> {
    return await this.videoProcessService.processVideo(processVideoData);
  }


}
