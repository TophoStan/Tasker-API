import 'dotenv/config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { LogMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qm2fcyz.mongodb.net/tasker?retryWrites=true&w=majority&appName=Cluster0`),
  MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LogMiddleware)
      .forRoutes('*')
  }
 }
