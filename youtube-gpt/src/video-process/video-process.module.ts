import { Module } from "@nestjs/common";
import { VideoProcessService } from "./video-process.service";
import { VideoProcessController } from "./video-process.controller";
import { ConfigModule } from "@nestjs/config";
import { OpenaiModule } from "src/openai/openai.module";
import { ProcessDataModule } from "src/processed-data/process-data.module";

@Module({
  imports: [ConfigModule, OpenaiModule, ProcessDataModule],
  providers: [VideoProcessService],
  controllers: [VideoProcessController],
})
export class VideoProcessModule {}
