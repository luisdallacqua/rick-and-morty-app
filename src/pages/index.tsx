import { api } from '../services/createApi'
import { signOut, useSession } from 'next-auth/client'
import { useAuth } from '../hooks/useAuth'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import authRoute from '../components/ProtectedRoute'
import WelcomePage from '../components/WelcomePage'

function Home() {
  const [session, loading] = useSession()
  const auth = useAuth()

  const user: any = session?.user
  if (user) auth.signIn(user)

  return <WelcomePage auth={auth} />
}
export default authRoute(Home)
