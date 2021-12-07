import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'

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
    const { name, email, password, cpf, birthDate, role, avatar }: IUser =
      req.body

    const newUser = { name, cpf, email, birthDate, role, password, avatar }

    if (!name || !cpf || !email || !birthDate || !role || !password) {
      res.status(400).json({ error: 'Is missing required fields' })
      return
    }

    const { db } = await connectToDatabase()

    const response = await db
      .collection('users')
      .insertOne({ ...newUser, avatar: avatar || '', favoriteCharacters: [] })

    res.status(201).json({
      success: `The user ${newUser.name} was created sucessfully`,
      response
    })
  }
}
