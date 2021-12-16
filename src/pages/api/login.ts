import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'POST') {
    const { email, password } = req.body as Pick<IUser, 'email' | 'password'>

    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Wrong password or User' })
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Wrong password or User' })
    }

    return res.status(200).json(user)
  }
}
