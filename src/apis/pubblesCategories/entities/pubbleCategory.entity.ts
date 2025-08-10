import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PubbleCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
