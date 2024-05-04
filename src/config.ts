import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const enviroments = {
  dev: '.env',
  test: '.test.env',
  prod: '.prod.env',
};

export const config = registerAs('config', () => {
  return {
    database: process.env.POSTGRES_DATABASE_URL,
    apiKey: process.env.API_KEY,
  };
});

export const configSchema = Joi.object({
  API_KEY: Joi.number().required(),
  POSTGRES_DATABASE_URL: Joi.string().required(),
});
