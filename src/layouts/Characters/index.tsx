import { useEffect, useState } from 'react'
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography
} from '@mui/material'
import CharacterCard from '../../components/CharecterCard'
import { CharacterProps } from '../../components/CharecterCard/types'
// import { useRemoteService } from '../hooks/useRemoteService'
import { api } from '../../services/createApi'
import { useSession } from 'next-auth/client'
import { useAuth } from '../../hooks/useAuth'
import SearchBar from '../../components/SearchBar'
import axios from 'axios'

const baseURL = 'https://rickandmortyapi.com/api/character/'

interface InfoProps {
  count: number
  pages: number
  next: string
  prev: string | null
}

function CharacterPage() {
  const auth = useAuth()

  const [favoriteCharacters, setFavoriteCharacters] = useState<number[]>([])

  const [page, setPage] = useState(1)
  const [URL, setURL] = useState(`${baseURL}?page=${page}`)
  const [info, setInfo] = useState<InfoProps>({} as InfoProps)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [characters, setCharacters] = useState<CharacterProps[]>([])
  const [search, setSearch] = useState('')

  async function getCharactersAndItsFavorites() {
    setError(false)
    setLoading(true)

    try {
      const favoriteChars = async () => {
        const response = await api.get(`/user?email=${auth.email}`)
        const favoriteCharacters = await response.data.favoriteCharacters
        return favoriteCharacters
      }

      const getChars = async () => {
        const res = await axios.get(URL)
        setCharacters(res.data.results)
        setInfo(res.data.info)
      }
      const favChar = await favoriteChars()
      setFavoriteCharacters(favChar)
      await getChars()
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCharactersAndItsFavorites()
  }, [URL, page])

  if (error)
    return (
      <>
        <SearchBar
          search={search}
          setSearch={setSearch}
          baseURL={baseURL}
          setURL={setURL}
        />
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {'There is an error, try again later'}
        </Alert>
      </>
    )

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        baseURL={baseURL}
        setURL={setURL}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography my={5} variant="h5" align="center">
            List of Characters Rick And Morty
          </Typography>
          <Grid
            container
            justifyContent="center"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {characters?.map((character: CharacterProps) => {
              const isFavorite = favoriteCharacters?.includes(character.id)

              return (
                <Grid item xs={6} sm={4} md={3} key={character.id}>
                  <CharacterCard
                    isFavorited={isFavorite}
                    id={character.id}
                    name={character.name}
                    status={character.status}
                    species={character.species}
                    gender={character.gender}
                    image={character.image}
                    location={character.location}
                    origin={character.origin}
                  />
                </Grid>
              )
            })}
          </Grid>
          <Stack my={3}>
            <Pagination
              count={info?.pages ? info.pages : 10}
              sx={{ margin: '0 auto' }}
              color="secondary"
              page={page}
              onChange={(e: React.ChangeEvent<unknown>, page: number) => {
                setPage(page)
                setURL(`${baseURL}?page=${page}`)
              }}
            />
          </Stack>
        </>
      )}
    </>
  )
}

export default CharacterPage
