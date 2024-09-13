import { Controller, Get } from '@nestjs/common';
import { Task } from 'src/schema/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getTasks(): Promise<Task[]> {
        return await this.taskService.gettasks();
    }
}
