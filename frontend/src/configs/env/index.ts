import { z } from "zod";

const envSchemaValidator = z.object({
  VITE_AUTH_SERVER_URL: z.string(),
  VITE_MAIN_SERVER_URL: z.string(),
  VITE_REPLICA_SERVER_URL: z.string(),
});

const parsingResult = envSchemaValidator.safeParse(import.meta.env);

if (!parsingResult.success) {
  throw new Error("VARIÁVEIS-AMBIENTE INCORRETAS");
}

export const env = parsingResult.data;
