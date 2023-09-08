import { Module } from '@nestjs/common';
import { VideoProcessService } from './video-process.service';
import { VideoProcessController } from './video-process.controller';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [ConfigModule, OpenaiModule],
  providers: [VideoProcessService],
  controllers: [VideoProcessController]
})
export class VideoProcessModule {}
