import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5501', 'https://hoppscotch.io/'],
    methods: '*',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
