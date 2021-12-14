import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { api } from '../../../services/createApi'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'username-login',
      name: 'username',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        const userFromDb = await api.post('/login', credentials)
        const user = await userFromDb.data
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user._id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    }
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  }
})
