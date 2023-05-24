import { z } from 'zod'

export const newGlobalMessageSchemaValidator = z.object({
  userId: z.string(),
  username: z.string(),
  message: z.string(),
})
