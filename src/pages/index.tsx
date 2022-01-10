import { api } from '../services/createApi'
import { signOut, useSession } from 'next-auth/client'
import { useAuth } from '../hooks/useAuth'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'

async function handleLogout() {
  await api.post('/logout')
}

export default function Home() {
  const [session, loading] = useSession()
  const router = useRouter()

  const auth = useAuth()

  const user: any = session?.user

  if (user) auth.signIn(user)

  console.log('session', { session })

  return (
    <>
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>logout</button>
          {auth.name && <p>{auth.name}</p>}
          {auth.name && <p>{auth.role}</p>}
          {auth.name && <p>{auth.email}</p>}
          {auth.name && <p>{auth.sub}</p>}
          {auth.name && (
            <Avatar
              src={auth.picture}
              alt={auth.name}
              variant="rounded"
              sx={{ maxHeight: 60 }}
            />
          )}
        </>
      ) : (
        <>
          <p> Click para logar</p>
          <button onClick={() => router.push('login')}>LOGIN</button>
        </>
      )}
    </>
  )
}
