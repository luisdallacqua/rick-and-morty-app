import NextAuth, { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Providers from 'next-auth/providers'
import { api } from '../../../services/createApi'

type AuthProps = {
  email: string
  password: string
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@email.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize({ email, password }: AuthProps) {
        const userFromDB = await api.post('/login', { email, password })
        const user = await userFromDB.data

        if (user) {
          return user
        } else {
          throw new Error('Wrong password or User')
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true
  },
  callbacks: {
    session: async (session: Session, user: User) => {
      session.jwt = user.jwt
      if (user) session.user = user

      return Promise.resolve(session)
    },
    jwt: async (token: JWT, user: User) => {
      if (user) {
        token.email = user.email
        token.name = user.name
        token.picture = user.avatar as string
        token.sub = user.sub as string
        token.role = user.role
        token.jwt = user.jwt
      }
      return Promise.resolve(token)
    }
  }
})
