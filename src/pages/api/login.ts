import { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '../../components/RegisterForm/types'
import { compare } from 'bcrypt'
import { userRepository } from './UserRepository'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    res.status(405).json({ error: 'METHOD NOT ALLOWED' })

  const { email, password } = req.body as Pick<IUser, 'email' | 'password'>

  const user = await userRepository().findOneByEmail(email)

  if (!user) {
    return res.status(401).json({ error: 'There is no user' })
  }

  //comparing password with the hashed password
  compare(password, user.password, function (err, result) {
    if (err || !result) {
      res.status(401).json({ error: 'Wrong password or User' })
      return
    }

    res.status(200).json({
      sub: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    })
  })
}
