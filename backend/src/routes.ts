import { FastifyInstance } from 'fastify'
import { compare, hash } from 'bcryptjs'
import { z } from 'zod'

import { prisma } from './lib/prisma'

const createUserBodySchemaValidator = z.object({
  nickname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

const authenticateUserBodySchemaValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function appRoutes(app: FastifyInstance) {
  app.post('/users/create', async (request, reply) => {
    const { nickname, email, password } = createUserBodySchemaValidator.parse(
      request.body,
    )

    const passwordHash = await hash(password, 6)

    await prisma.user.create({
      data: {
        nickname,
        email,
        password_hash: passwordHash,
      },
    })

    return reply.status(201).send()
  })
  app.post('/users/authenticate', async (request, reply) => {
    const { email, password } = authenticateUserBodySchemaValidator.parse(
      request.body,
    )

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return reply.status(400).send({
        error: true,
        message: 'Email ou Senha incorretos!',
      })
    }

    const passwordIsValid = await compare(password, user.password_hash)

    if (!passwordIsValid) {
      return reply.status(400).send({
        error: true,
        message: 'Email ou Senha incorretos!',
      })
    }

    return reply.status(200).send({
      nickname: user.nickname,
    })
  })
}
