import { NestFactory } from '@nestjs/core';
import { AppModule } from './url/app.module';
import './init'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
