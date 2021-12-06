import { useEffect, useState } from 'react'
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import CharacterCard from '../components/CharecterCard'
import { CharacterProps } from '../components/CharecterCard/types'
// import { useRemoteService } from '../hooks/useRemoteService'
import { api } from '../services/createApi'

const baseURL = 'https://rickandmortyapi.com/api/character'

const Char = () => {
  const [URL, setURL] = useState(`${baseURL}`)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [characters, setCharacters] = useState<CharacterProps[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)
      try {
        const res = await api.get(URL)
        setCharacters(res.data.results)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [URL])

  if (loading) return <CircularProgress />
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {
          'Ocorreu um erro ao carregar os dados, tente novamente mais tarde, ou busque outro nome de personagem'
        }
      </Alert>
    )

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'grey.200',
          width: 400,
          m: '1rem 0'
        }}
        elevation={0}
      >
        {/* <IconButton color="secondary" sx={{ p: '10px' }} aria-label="menu"> */}
        <SearchIcon color="secondary" />
        {/* </IconButton> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Procurar por Personagem"
          inputProps={{ 'aria-label': 'procurar por personagem' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="secondary"
          sx={{ p: '10px' }}
          aria-label="directions"
          onClick={() => setURL(`${baseURL}?name=${search}`)}
        >
          <SendIcon />
        </IconButton>
      </Paper>

      <Typography my={5} variant="h5" align="center">
        Personagens de Rick And Morty
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {characters?.map((character: CharacterProps) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={character.name}>
              <CharacterCard
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
      <Stack my={3} mx="auto">
        <Pagination count={10} sx={{ margin: '0 auto' }} color="secondary" />
      </Stack>
    </>
  )
}

export default Char
