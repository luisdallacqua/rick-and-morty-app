import { Grid } from '@mui/material'
import CharacterCard from '../components/CharecterCard'
import { CharacterMock } from '../mocks/character'

const Char = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      // columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {CharacterMock.map((character) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={character.name}>
            <CharacterCard
              name={character.name}
              status={character.status}
              species={character.species}
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
