import authRoute from '../components/ProtectedRoute'
import CharacterPage from '../Layouts/Characters'

export default authRoute(function Char() {
  return <CharacterPage />
})
