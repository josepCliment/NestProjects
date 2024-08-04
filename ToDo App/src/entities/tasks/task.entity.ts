import { Column, Entity, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { GenericEntity } from '../entities/entity.entity';
import { User } from '../users/user.entity';

@Entity('tasks')
export class Task extends GenericEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
