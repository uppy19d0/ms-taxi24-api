import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Taxi24 Api')
    .setDescription('Code challenger of  Luis A. Tavarez app for taxi24 ')
    .setVersion('1.0')
    .addTag('taxi24')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
  
}
bootstrap();

