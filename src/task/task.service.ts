import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { task } from 'src/schema/task.schema';

@Injectable()
export class taskService {

    constructor(@InjectModel(task.name) private taskModel: Model<task>) {}

    gettasks(): Promise<task[]> {
        

        return this.taskModel.find().exec();
    }
}
