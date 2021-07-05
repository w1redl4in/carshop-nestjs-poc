import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Car Shop Swagger')
    .setDescription('The Car Shop documentation')
    .setVersion('1.0')
    .addTag('users')
    .addTag('cars')
    .build();

  const swagger = SwaggerModule.createDocument(app, options, {
    include: [CarsModule, UsersModule],
  });

  SwaggerModule.setup('api', app, swagger);

  await app.listen(3000);
}
bootstrap();
