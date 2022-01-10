import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    res.status(405).json({ error: 'METHOD NOT ALLOWED' })

  const { email, password } = req.body as Pick<IUser, 'email' | 'password'>

  const { db } = await connectToDatabase()
  const user = await db.collection('users').findOne({ email })

  if (!user) {
    return res.status(401).json({ error: 'There is no user' })
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

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // const jwt = sign(payload, process.env.JWT_SECRET!, {
        //   expiresIn: '1h'
        // })

        res.status(200).json(payload)
      } else {
        res.status(401).json({ error: 'Wrong password or User' })
      }
    })
  }
}
