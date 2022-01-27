import { useSession } from 'next-auth/client'
import { createContext, useEffect, useState } from 'react'
import { IAuthProvider, IContext, UserProps } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const [session] = useSession()

  console.log('session', session)

  useEffect(() => {
    const user: any = session?.user
    if (user) {
      setUser(user)
    }
  }, [session])

  return (
    <AuthContext.Provider value={{ setUser, ...user }}>
      {children}
    </AuthContext.Provider>
  )
}
