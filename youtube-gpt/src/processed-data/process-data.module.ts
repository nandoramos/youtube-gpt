import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TranscriptionsRepository } from "./transcriptions.repository";
import { ProcessDataService } from "./procces-data.service";
import { SummariesRepository } from "./summaries.repository";
import { QuizzesRepository } from "./quizzes.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([TranscriptionsRepository]),
    TypeOrmModule.forFeature([SummariesRepository]),
    TypeOrmModule.forFeature([QuizzesRepository]),
  ],
  providers: [ProcessDataService],
  exports: [ProcessDataService],
})
export class ProcessDataModule {}
