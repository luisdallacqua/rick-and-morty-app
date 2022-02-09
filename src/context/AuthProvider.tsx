import { useSession } from 'next-auth/client'
import { createContext, useEffect, useState } from 'react'
import { IAuthProvider, IContext, UserProps } from './types'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [session] = useSession()

  useEffect(() => {
    const user: any = session?.user
    if (user) {
      const admin = user.role.toLowerCase() === 'admin'
      setIsAdmin(admin)
      setUser(user)
    }
  }, [session])

  return (
    <AuthContext.Provider value={{ setUser, ...user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}
