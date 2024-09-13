import { Controller, Get } from '@nestjs/common';
import { taskService } from './task.service';
import { task } from 'src/schema/task.schema';

@Controller('task')
export class taskController {

    constructor(private readonly taskService: taskService) { }

    @Get()
    async getChallange(): Promise<task[]> {
        return await this.taskService.gettasks();
    }
}
