import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Task } from 'src/schema/task.schema';
import { TaskService } from './task.service';
import { InjectToken } from 'src/schema/token.class';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getTasks(@InjectToken() token): Promise<Task[]> {

        return await this.taskService.getTasksNotOverdue(token.id);
    }

    @Get('allTasks')
    async getAllTasks(): Promise<Task[]> {
        return await this.taskService.getTasks();
    }

    @Get('makeTasksDatabaseTruthy')
    async makeTasksDatabaseTruthy() {
        return await this.taskService.makeTasksDatabaseTruthy();
    }

    @Get(':id')
    async getTask(@Param() params): Promise<Task> {
        return await this.taskService.getTask(params.id);
    }

    @Post()
    async createTask(@Body() task: Task, @InjectToken() token): Promise<Task> {
        return await this.taskService.createTask(task, token.id );
    }

    @Put(':id')
    async updateTask(@Param() params, @Body() task: Task): Promise<Task> {
        return await this.taskService.updateTask(task, params.id);
    }
}
