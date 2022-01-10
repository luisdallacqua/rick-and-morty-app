import { api } from '../services/createApi'
import { useSession } from 'next-auth/client'

async function handleLogout() {
  await api.post('/logout')
}

export default function Home() {
  const [session, loading] = useSession()

  if (session) {
    return <p>Signed in as {session.user?.email}</p>
  }

  return (
    <>
      <p> sem data</p>
      <button onClick={handleLogout}>logout</button>
    </>
  )
}
