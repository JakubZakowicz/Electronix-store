// https://www.youtube.com/watch?v=TkALNF0mrK0&ab_channel=TechWithPiotr

import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  REDIS_PORT: number;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  SSL_KEY_PATH: string;

  @IsNotEmpty()
  @IsString()
  SSL_CERT_PATH: string;

  @IsNotEmpty()
  @IsString()
  CORS_ORIGIN: string;

  @IsNotEmpty()
  @IsString()
  SESSION_SECERT: string;

  @IsNotEmpty()
  @IsString()
  STRIPE_PUBLISHABLE_KEY: string;

  @IsNotEmpty()
  @IsString()
  STRIPE_SECRET_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
}
