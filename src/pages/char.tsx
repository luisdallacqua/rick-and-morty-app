import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid } from '@mui/material'
import CharacterCard from '../components/CharecterCard'
import { CharacterProps } from '../components/CharecterCard/index'

const Char = () => {
  const [characters, setCharacters] = useState<CharacterProps[] | []>([])

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9]'
      )
      const data = await response.data
      setCharacters(data)
    }
    fetchCharacters()
  }, [])

  return (
    <Grid
      container
      mt={4}
      spacing={{ xs: 2, md: 3 }}
      // columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {characters.map((character) => {
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
