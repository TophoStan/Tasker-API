import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schema/task.schema';

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        return await this.taskModel.find();
    }

    async getTask(id: string): Promise<Task> {
        console.log(id);
        
        return await this.taskModel.findOne(
            { id: id }
        );
    }

    async createTask(task: Task): Promise<Task> {
        const newTask = new this.taskModel(task);
        return await newTask.save();
    }

    async updateTask(task: Task): Promise<Task> {
        await this.taskModel.findOneAndUpdate(
            { id: task['id'] },
            task,
            { new: true }
        )
        return await this.taskModel.findById(task['id']);
    }


}
