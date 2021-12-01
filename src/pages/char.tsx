import {
  Alert,
  AlertTitle,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import CharacterCard from '../components/CharecterCard'
import { CharacterProps } from '../components/CharecterCard/types'
import { useRemoteService } from '../hooks/useRemoteService'

const Char = () => {
  const { data, loading, error } = useRemoteService(
    'https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9,10,11,12]'
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
    <>
      <Typography my={5} variant="h5" align="center">
        Personagens de Rick And Morty
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {data?.map((character: CharacterProps) => {
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
      <Typography my={5} variant="h5" align="center">
        Aqui ficará a paginação
      </Typography>
    </>
  )
}

export default Char
