import authRoute from '../components/ProtectedRoute'
import CharacterPage from '../layouts/Characters'

export default authRoute(function Char() {
  return <CharacterPage />
})
