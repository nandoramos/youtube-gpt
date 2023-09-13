import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  videoId: string;

  @Column()
  title: string;

  @Column()
  text: string;
}
