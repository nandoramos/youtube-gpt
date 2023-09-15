import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import * as fs from 'fs';

jest.mock('fs', () => ({
  createWriteStream: jest.fn(),
  createReadStream: jest.fn(),
}));

jest.mock('openai', () => ({
  OpenAI: jest.fn(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
    audio: {
      transcriptions: {
        create: jest.fn(),
      },
    },
  })),
}));

jest.mock('fs');

describe('OpenaiService', () => {
  let service: OpenaiService;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenaiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
    mockConfigService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getResponseFromOpenAI', () => {
    it('should retrieve response from OpenAI', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Test content',
            },
          },
        ],
      };

      service.openai.chat.completions.create.mockResolvedValue(mockResponse);

      const result = await service.getResponseFromOpenAI('text', 'question', 500);

      expect(result).toBe('Test content');
      // ... more assertions to check parameters if necessary ...
    });

    it('should throw error when no choices returned', async () => {
      service.openai.chat.completions.create.mockResolvedValue({});

      await expect(service.getResponseFromOpenAI('text', 'question', 500)).rejects.toThrow('No choices returned from OpenAI.');
    });
  });

  describe('getResponseFromOpenAI', () => {
    it('should retrieve a response from OpenAI', async () => {
      // Mock the OpenAI response
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Test response from OpenAI',
            },
          },
        ],
      };

      // Mock the OpenAI method
      service.openai.chat.completions.create = jest.fn().mockResolvedValue(mockResponse);

      const transcribedText = 'sample transcribed text';
      const question = 'sample question';
      const max_tokens = 512;

      const result = await service.getResponseFromOpenAI(transcribedText, question, max_tokens);

      expect(result).toBe('Test response from OpenAI');
      expect(service.openai.chat.completions.create).toHaveBeenCalledWith({
        model: undefined,
        messages: [
          {
            role: 'system',
            content: transcribedText,
          },
          {
            role: 'user',
            content: question,
          },
        ],
        temperature: 0,
        max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    });

    it('should throw an error if no choices returned', async () => {
      const mockResponse = { choices: [] };

      service.openai.chat.completions.create = jest.fn().mockResolvedValue(mockResponse);

      const transcribedText = 'sample transcribed text';
      const question = 'sample question';
      const max_tokens = 512;

      await expect(service.getResponseFromOpenAI(transcribedText, question, max_tokens)).rejects.toThrow('No choices returned from OpenAI.');
    });
  });



  describe('saveAudioToFile', () => {
    it('should save audio to a file', async () => {
      const mockFilePath = 'mockPath/mockFile.mp4';

      const mockStream = new Readable({
        read() {
          this.push(null);  // end of the stream
        }
      });

      const mockWriteStream = {
        on: jest.fn((event, callback) => {
          if (event === 'finish') callback();
        }),
        once: jest.fn(),
        end: jest.fn(),
        write: jest.fn(),
        emit: jest.fn()
      };

      (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);

      mockStream.on('data', (data) => {
        mockWriteStream.write(data);
      });

      mockStream.on('end', () => {
        mockWriteStream.end();
        mockWriteStream.on('finish', () => {
          // Here, you can add additional assertions if needed
        });
      });

      await service.saveAudioToFile(mockStream, mockFilePath);

      expect(fs.createWriteStream).toHaveBeenCalledWith(mockFilePath);
    });

    // ... (keep the error test as is)
  });

  describe('transcribeAudio', () => {
    it('should transcribe audio', async () => {
      const mockStream = new Readable({
        read() {
          this.push('mock audio data');
          this.push(null); // indicates stream end
        }
      });

      const mockTranscription = {
        text: 'Test transcription',
      };

      // Mocking the OpenAI transcription method
      service.openai.audio.transcriptions.create = jest.fn().mockResolvedValue(mockTranscription);

      // Mock the saveAudioToFile method to bypass file operations
      service.saveAudioToFile = jest.fn().mockResolvedValue(undefined);

      const result = await service.transcribeAudio(mockStream, 'testName');

      expect(result).toBe('Test transcription');
      expect(service.openai.audio.transcriptions.create).toHaveBeenCalled();
      expect(service.saveAudioToFile).toHaveBeenCalledWith(mockStream, expect.any(String));
    });
  });
});
