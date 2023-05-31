import { z } from 'zod'

export const newGlobalMessageSchemaValidator = z.object({
  nickname: z.string(),
  message: z.string(),
})
