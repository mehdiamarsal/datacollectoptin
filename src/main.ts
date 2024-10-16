import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const fs = require('fs');
const keyFile = fs.readFileSync('/home/datacollectoptin/ssl/keys/8e811_66a9b_3875f1901f83f16654a169248b1b83e2.key');
const certFile = fs.readFileSync('/home/datacollectoptin/ssl/certs/api_datacollectoptin_com_8e811_66a9b_1760608687_a8dffefe6921360bcb3fb33ae21ad8d6.crt');


//console.log(certFile)

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Supprime les propriétés non spécifiées dans le DTO
    forbidNonWhitelisted: true,  // Renvoie une erreur si des propriétés non spécifiées sont présentes
    transform: true,  // Transforme les types des paramètres (par exemple string en number)
  }));

  // Configurez CORS ici pour n'accepter que certains domaines
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin.match(/example\.com$/)) {
        // Accepter les requêtes venant de 'example.com' et ses sous-domaines
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(process.env.PORT);
}
bootstrap();
