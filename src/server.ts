import crypto from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'test',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running!')
})
