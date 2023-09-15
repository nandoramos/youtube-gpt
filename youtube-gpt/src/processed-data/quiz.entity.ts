import { Lang } from "../video-process/dto/process-video.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  videoId: string;

  @Column()
  text: string;

  @Column()
  lang: Lang;
}
