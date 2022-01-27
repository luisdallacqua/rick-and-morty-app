import authRoute from '../components/ProtectedRoute'
import CharacterPage from '../templates/Characters'

export default authRoute(function Char() {
  return <CharacterPage />
})
