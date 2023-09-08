import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({

  PORT:Joi.number().default(3000).required(),
  OPEN_AI_KEY:Joi.string().required(),
  MODEL_NAME:Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  JWT_SECRET:Joi.string().required(),
});

