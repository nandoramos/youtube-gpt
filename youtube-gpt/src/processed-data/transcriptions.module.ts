import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TranscriptionsRepository } from "./transcriptions.repository";
import { TranscriptionsService } from "./transctiptions.service";
import { SummariesRepository } from "./summaries.repository";
import { QuizzesRepository } from "./quizzes.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([TranscriptionsRepository]),
    TypeOrmModule.forFeature([SummariesRepository]),
    TypeOrmModule.forFeature([QuizzesRepository]),
  ],
  providers: [TranscriptionsService],
  exports: [TranscriptionsService],
})
export class TranscriptionsModule {}
