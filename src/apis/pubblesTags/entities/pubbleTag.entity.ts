import { Pubble } from 'src/apis/pubbles/entities/pubble.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PubbleTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Pubble, (pubble) => pubble.pubbleTags)
  pubbles: Pubble[];
}
