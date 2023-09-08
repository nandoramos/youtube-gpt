import { Test, TestingModule } from '@nestjs/testing';
import { VideoProcessService } from './video-process.service';

describe('VideoProcessService', () => {
  let service: VideoProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoProcessService],
    }).compile();

    service = module.get<VideoProcessService>(VideoProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
