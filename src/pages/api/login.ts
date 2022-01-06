import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import cookie from 'cookie'

export const KEY = 'xdw1420hACglKWZPRu4ZjfbEXhr73wpxP3U0cWmSKP4='

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body as Pick<IUser, 'email' | 'password'>

    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Theres no user' })
    }

    if (user) {
      //comparing password with the hashed password
      compare(password, user.password, function (err, result) {
        if (!err && result) {
          const payload = {
            sub: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
          }
          const jwt = sign(payload, KEY, { expiresIn: '1h' })
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 60 * 60,
              path: '/'
            })
          )
          res.json({ message: 'You are logged in' })
        } else {
          res.status(401).json({ error: 'Wrong password or User' })
        }
      })
    }
  }
}
