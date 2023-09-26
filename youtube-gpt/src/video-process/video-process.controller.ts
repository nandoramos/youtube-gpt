import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { VideoProcessService } from "./video-process.service";
import { ConfigService } from "@nestjs/config";
import { OpenaiService } from "../openai/openai.service";
import { Lang, ProcessVideo } from "./dto/process-video.dto";
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
  async getAll(): Promise<Transcription[]> {
    return await this.videoProcessService.getAll();
  }

  @Get('/:id')
  async getVideoById(
    @Param('id') videoId: string,
    @Query('lang') lang: Lang = Lang.EN
  ): Promise<VideoResult> {
    const processVideoData: ProcessVideo = {
      videoId,
      lang,
    }
    return await this.videoProcessService.processVideo(processVideoData);
  }

  @Post()
  async processVideo(
    @Body() processVideoData: ProcessVideo
  ): Promise<VideoResult> {
    return await this.videoProcessService.processVideo(processVideoData);
  }


}
