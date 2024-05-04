import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, configSchema, enviroments } from './config';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
