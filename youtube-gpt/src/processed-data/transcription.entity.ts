import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  videoId: string;

  @Column()
  title: string;

  @Column()
  text: string;
}
