import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptionsRepository } from './transcriptions.repository';
import { SummariesRepository } from './summaries.repository';
import { QuizzesRepository } from './quizzes.repository';
import { Transcription } from './transcription.entity';
import { ProcessDataService } from './procces-data.service';
import { Lang } from 'src/video-process/dto/process-video.dto';

describe('ProcessDataService', () => {
  let service: ProcessDataService;
  let transcriptionsRepository: jest.Mocked<TranscriptionsRepository>;
  let summariesRepository: jest.Mocked<SummariesRepository>;
  let quizzesRepository: jest.Mocked<QuizzesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessDataService,
        {
          provide: TranscriptionsRepository,
          useValue: {
            getTranscription: jest.fn(),
            createTranscription: jest.fn(),
            getAll: jest.fn(),
          },
        },
        {
          provide: SummariesRepository,
          useValue: {
            getSummary: jest.fn(),
            createSummary: jest.fn(),
          },
        },
        {
          provide: QuizzesRepository,
          useValue: {
            getQuiz: jest.fn(),
            createQuiz: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProcessDataService>(ProcessDataService);
    transcriptionsRepository = module.get(TranscriptionsRepository);
    summariesRepository = module.get(SummariesRepository);
    quizzesRepository = module.get(QuizzesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTranscription should return a transcription', () => {
    it('should return a transcription by video ID', async () => {
      const mockTranscription = new Transcription();
      mockTranscription.id = '123';
      transcriptionsRepository.getTranscription.mockResolvedValue(mockTranscription);

      const result = await service.getTranscription('123');
      expect(result).toBe(mockTranscription);
    });
  });


  describe('createTranscription should create a transcription', () => {
    it('should return a transcription by video ID', async () => {
      const mockTranscription = new Transcription();
      mockTranscription.id = '123';
      transcriptionsRepository.getTranscription.mockResolvedValue(mockTranscription);

      const result = await service.getTranscription('123');
      expect(result).toBe(mockTranscription);
    });
  });

  describe('createTranscription', () => {
    it('should create and return a transcription', async () => {
      const mockTranscriptionDto = {
        videoId: '12345',
        text: 'Sample transcription text',
        title: 'video title'
      };

      const mockTranscription = new Transcription();
      mockTranscription.id = '12345';
      mockTranscription.text = 'Sample transcription text';
      mockTranscription.title = 'video title';

      transcriptionsRepository.createTranscription.mockResolvedValue(mockTranscription);

      const result = await service.createTranscription(mockTranscriptionDto);

      expect(result).toBe(mockTranscription);
      expect(transcriptionsRepository.createTranscription).toHaveBeenCalledWith(mockTranscriptionDto);
    });
  });



});
