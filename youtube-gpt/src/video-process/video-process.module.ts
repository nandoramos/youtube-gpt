import { Module } from "@nestjs/common";
import { VideoProcessService } from "./video-process.service";
import { VideoProcessController } from "./video-process.controller";
import { ConfigModule } from "@nestjs/config";
import { OpenaiModule } from "src/openai/openai.module";
import { TranscriptionsModule } from "src/processed-data/transcriptions.module";
import { TranscriptionsService } from "src/processed-data/transctiptions.service";
import { TranscriptionsRepository } from "src/processed-data/transcriptions.repository";
import { TasksModule } from "src/tasks/tasks.module";
import { TasksService } from "src/tasks/tasks.service";
import { TasksRepository } from "src/tasks/tasks.repository";

@Module({
  imports: [ConfigModule, OpenaiModule, TranscriptionsModule],
  providers: [VideoProcessService],
  controllers: [VideoProcessController],
})
export class VideoProcessModule {}
