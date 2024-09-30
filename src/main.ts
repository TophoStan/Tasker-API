import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';


const httpsOptions = {
  key: fs.readFileSync('./secrets/localhost-key.pem'),
  cert: fs.readFileSync('./secrets/localhost.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  app.enableCors();
  await app.listen(3000);
} 
bootstrap();
