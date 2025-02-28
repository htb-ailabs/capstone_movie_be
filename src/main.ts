import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from './common/helpers/not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT);
  app.useGlobalPipes(new ValidationPipe()); // ✅ Enable validation
  app.useGlobalFilters(new NotFoundExceptionFilter()); // Global filter

  //CORS
  app.enableCors({
    origin: ['http://localhost:5173'],
  });

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('API Movie')
    .setDescription('The movie API description')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
