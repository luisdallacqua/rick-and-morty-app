import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { api } from '../../../services/createApi'

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
      async authorize(credentials, req) {
        const { email, password } = credentials

        const userFromDB = await api.post('/login', { email, password })
        const user = await userFromDB.data
        if (!user) {
          throw new Error('Something went wrong')
        }

        if (user) {
          return user
        } else {
          throw new Error('Wrong password or User')
        }
      }
    })
  ],
  callbacks: {
    async session(session: any, user: any) {
      return session
    },
    async jwt(token, user) {
      if (user && token) {
        token.picture = user.avatar as string
        token.sub = user.sub as string
        token.role = user.role
      }
      return token
    }
  }
})
