import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Task } from 'src/schema/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getTasks(): Promise<Task[]> {
        return await this.taskService.getTasks();
    }

    @Get(':id')
    async getTask(@Param() params): Promise<Task> {
        return await this.taskService.getTask(params.id);
    }

    @Post()
    async createTask(@Body() task: Task): Promise<Task> {
        return await this.taskService.createTask(task);
    }

    @Put()
    async updateTask(@Body() task: Task): Promise<Task> {
        return await this.taskService.updateTask(task);
    }
}
