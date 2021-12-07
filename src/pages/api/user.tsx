import { NextApiRequest, NextApiResponse } from 'next'
import { users } from '../../../db.json'
import { connectToDatabase } from '../../utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { db } = await connectToDatabase()
  const data = await db.collection('users').find({}).toArray()

  if (method === 'GET') {
    res.status(200).json(data)
  }

  if (method === 'POST') {
    const { body } = req
    const { name, cpf, email, birthDate, role, password } = body
    const newUser = { name, cpf, email, birthDate, role, password }
    await db.collection('users').insertOne(newUser)
    res.status(200).json(newUser)
  }
}
