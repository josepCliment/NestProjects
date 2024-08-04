import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async createTask(
    title: string,
    description: string,
    userId: number,
  ): Promise<Task> {
    let task = new Task();
    task.title = title;
    task.description = description;
    task.user = { id: userId } as any;

    return await this.tasksRepository.save(task);
  }
  async udpateTask(
    title: string,
    description: string,
    userId: number,
    id: string,
  ) {
    let task = await this.tasksRepository.findOneBy({
      id: parseInt(id),
      user: { id: userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.title = title;
    task.description = description;
    task.user = { id: userId } as any;
    const taskUpdated = await this.tasksRepository.update(task.id, task);

    return taskUpdated;
  }

  async getAllTasks(userId: number): Promise<Task[]> {
    const task = await this.tasksRepository.find({
      where: { user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException(
        'No tasks found for the user with id ' + userId,
      );
    }
    return task;
  }

  async getTaskById(userId: number, id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({
      id: parseInt(id),
      user: { id: userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
  async deleteTask(userId: number, id: string): Promise<{ message: string }> {
    const task = await this.tasksRepository.findOneBy({
      id: parseInt(id),
      user: { id: userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const taskDeleted = await this.tasksRepository.delete(task.id);

    return {
      message: taskDeleted ? 'Task deleted successfully' : 'Task not deleted',
    };
  }
}
