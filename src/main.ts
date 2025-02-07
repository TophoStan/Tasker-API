import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const port = process.env.PORT || 3000;
const httpsOptions = !(process.env.NODE_ENV === 'production') ? {
  key: fs.readFileSync('./secrets/localhost-key.pem'),
  cert: fs.readFileSync('./secrets/localhost.pem'),
} : null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  app.enableCors();
  await app.listen(port);
} 
bootstrap();
