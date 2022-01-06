import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'
import { hash } from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'POST') {
    const { name, email, password, role, avatar }: IUser = req.body

    //hashing password
    hash(password, 10, async function (err: any, hash: string) {
      const newUser = { name, email, role, password: hash, avatar }

      if (!name || !email || !role || !hash) {
        res.status(400).json({ error: 'Its missing required fields' })
        return
      }

      const { db } = await connectToDatabase()

      await db
        .collection('users')
        .insertOne({ ...newUser, avatar: avatar || '', favoriteCharacters: [] })

      res.status(201).json({
        success: `The user ${newUser.name} was created sucessfully`
      })
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
