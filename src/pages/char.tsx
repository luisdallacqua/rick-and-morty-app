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

const baseURL = 'https://rickandmortyapi.com/api/character/'

interface InfoProps {
  count: number
  pages: number
  next: string
  prev: string | null
}

const Char = () => {
  const [page, setPage] = useState(1)
  const [URL, setURL] = useState(`${baseURL}?page=${page}`)
  const [info, setInfo] = useState<InfoProps>({} as InfoProps)

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
        setInfo(res.data.info)
      } catch (e) {
        console.log(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [URL, page])

  if (loading) return <CircularProgress />
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {'Ocorreu um erro ao carregar os dados'}
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
          maxWidth: 400,
          margin: '1rem 0'
        }}
        elevation={0}
      >
        {/* <IconButton color="secondary" sx={{ p: '10px' }} aria-label="menu"> */}
        <SearchIcon color="secondary" />
        {/* </IconButton> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for character"
          inputProps={{ 'aria-label': 'search for character' }}
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
        List of Characters Rick And Morty
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {characters?.map((character: CharacterProps) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={character.id}>
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
  )
}

export default Char
