import 'dotenv/config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { LogMiddleware } from './middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserIdentitySchema } from './schema/userIdentity.schema';
import { UserSchema } from './schema/userData.schema';
import { TokenMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qm2fcyz.mongodb.net/tasker?retryWrites=true&w=majority&appName=Cluster0`),
  MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }, { name: 'UserIdentity', schema: UserIdentitySchema }, { name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController, TaskController, UserController],
  providers: [AppService, TaskService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LogMiddleware)
      .forRoutes('*')
      .apply(TokenMiddleware)
      .forRoutes('task')
  }
}
