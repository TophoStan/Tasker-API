import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { taskController } from './task/task.controller';
import { taskService } from './task/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './schema/task.schema';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qm2fcyz.mongodb.net/tasker?retryWrites=true&w=majority&appName=Cluster0`),
  MongooseModule.forFeature([{ name: 'task', schema: taskSchema }])
  ],
  controllers: [AppController, taskController],
  providers: [AppService, taskService],
})
export class AppModule { }
