import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { VideoProcessModule } from './video-process/video-process.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ProcessDataModule } from './processed-data/process-data.module';
import { Transcription } from './processed-data/transcription.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
       imports: [ConfigModule],
       inject: [ConfigService],
       useFactory: async (configService: ConfigService) => {
          return {
            type: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
          }
       }
    }),
    AuthModule,
    VideoProcessModule,
    OpenaiModule,
    ProcessDataModule,
  ],
})
export class AppModule {}
