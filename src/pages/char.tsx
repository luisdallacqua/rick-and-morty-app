import { Grid } from '@mui/material'
import CharacterCard from '../components/CharecterCard'
import { CharacterProps } from '../components/CharecterCard/index'
import { useRemoteService } from '../hooks/useRemoteService'

const Char = () => {
  // const [characters, setCharacters] = useState<CharacterProps[] | []>([])
  const { data, loading, error } = useRemoteService(
    'https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9]'
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <Grid
      container
      mt={5}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {data?.map((character: any) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={character.name}>
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
