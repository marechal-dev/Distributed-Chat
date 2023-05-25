import 'dotenv/config'

import { z } from 'zod'

const envVariablesSchemaValidator = z.object({
  NODE_ENV: z
    .enum(['production', 'development'] as const)
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
})

const envParsing = envVariablesSchemaValidator.safeParse(process.env)

if (!envParsing.success) {
  console.error('Incorrect env vars!')
  process.exit(1)
}

export const env = envParsing.data
