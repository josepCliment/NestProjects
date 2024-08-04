import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/createTask.dto';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  async createTask(@Body() body: CreateTaskDTO, @Request() req: any) {
    return this.tasksService.createTask(
      body.title,
      body.description,
      req.user.id,
    );
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDTO,
    @Request() req: any,
  ): Promise<{ message: string }> {
    return this.tasksService
      .udpateTask(body.title, body.description, req.user.id, id)
      .then((res) => {
        return { message: 'Task updated successfully' };
      })
      .catch((err) => {
        return { message: err.message };
      });
  }

  @Get('/all')
  async getAllTasks(@Request() req: any) {
    return this.tasksService.getAllTasks(req.user.id);
  }
  @Get('/:id')
  async getTaskById(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.getTaskById(req.user.id, id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string, @Request() req: any) {
    console.log('Deleting item ...');

    return this.tasksService.deleteTask(req.user.id, id);
  }
}
