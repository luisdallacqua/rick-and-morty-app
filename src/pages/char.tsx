import { Alert, AlertTitle, CircularProgress, Grid } from '@mui/material'
import CharacterCard from '../components/CharecterCard'
import { useRemoteService } from '../hooks/useRemoteService'

const Char = () => {
  // const [characters, setCharacters] = useState<CharacterProps[] | []>([])
  const { data, loading, error } = useRemoteService(
    'https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9]'
  )

  if (loading) return <CircularProgress />
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong with server. try again later.
      </Alert>
    )

  return (
    <Grid
      container
      mt={5}
      justifyContent="center"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {data?.map((character: any) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={character.name}>
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
  )
}

export default Char
