import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const { OpenAI } = require("openai");
import * as fs from "fs";

@Injectable()
export class OpenaiService {
  constructor(private configService: ConfigService) {}

  MODEL_NAME = this.configService.get("MODEL_NAME");
  OPEN_AI_KEY = this.configService.get("OPEN_AI_KEY");

  openai = new OpenAI({
    apiKey: this.OPEN_AI_KEY,
  });

  async getResponseFromOpenAI(
    transcribedText: string,
    question: string,
    max_tokens: number
  ): Promise<string> {
    try {
      const { choices } = await this.openai.chat.completions.create({
        model: this.MODEL_NAME,
        messages: [
          {
            role: "system",
            content: transcribedText,
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0,
        max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      if (choices && choices.length > 0) {
        return choices[0].message.content;
      }
      throw new Error("No choices returned from OpenAI.");
    } catch (e) {
      throw new Error(`Failed to get a response from OpenAI: ${e.message}`);
    }
  }

  async transcribeAudio(audioStream) {
    const filePath = "audio.mp4";
    await this.saveAudioToFile(audioStream, filePath);
    const transcription = await this.openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });
    return transcription.text;
  }

  async saveAudioToFile(stream, filePath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filePath);
      stream.pipe(file);
      file.on("finish", resolve);
      file.on("error", reject);
    });
  }
}
