import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class pubbleCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
