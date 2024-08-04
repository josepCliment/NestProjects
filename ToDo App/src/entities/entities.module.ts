import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesController } from './entities/entities.controller';
import { EntitiesService } from './entities/entities.service';
import { Task } from './tasks/task.entity';
import { TasksService } from './tasks/tasks.service';
import { UserController } from './users/user.controller';
import { User } from './users/user.entity';
import { UserService } from './users/user.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [EntitiesService, UserService, TasksService],
  controllers: [EntitiesController, UserController, TasksController],
  exports: [UserService],
})
export class EntitiesModule {}
