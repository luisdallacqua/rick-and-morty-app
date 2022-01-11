import { useSession } from 'next-auth/client'
import { useAuth } from '../hooks/useAuth'
import authRoute from '../components/ProtectedRoute'
import WelcomePage from '../components/WelcomePage'

function Home() {
  return <WelcomePage />
}
export default authRoute(Home)
