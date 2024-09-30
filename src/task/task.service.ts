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

    async getTasksNotOverdue(): Promise<Task[]> {

        //and the date of today
        return await this.taskModel.find(
            { isOverdue: false, DateTimeToBeCompletedBy: { $gte: new Date() } }
        );
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

    async updateTask(task: Task, id: string): Promise<Task> {
        const taskToBeUpdated = await this.taskModel.findOne(
            { id: id }
        );
        taskToBeUpdated.title = task.title;
        taskToBeUpdated.isCompleted = task.isCompleted;
        return await taskToBeUpdated.save();
    }

    async makeTasksDatabaseTruthy() {
        const tasks = await this.taskModel.find();
        for (let i = 0; i < tasks.length; i++) {
            //Look at the DateTimeToBeCompletedBy property of each task and judge if it is overdue
            //If it is overdue, set the isOverdue property to true
            //If it is not overdue, set the isOverdue property to false
            const task = tasks[i];
            const taskDateTimeToBeCompletedBy = task.DateTimeToBeCompletedBy;
            const currentDateTime = new Date();
            if (taskDateTimeToBeCompletedBy < currentDateTime) {
                task.isOverdue = true;
            } else {
                task.isOverdue = false;
            }
            await task.save();
        }
        return;
    }
}
