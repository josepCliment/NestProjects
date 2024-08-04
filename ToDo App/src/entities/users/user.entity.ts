import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from '../entities/entity.entity';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User extends GenericEntity {
  @Column()
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
