import CharacterCard from '../components/CharecterCard'
import { CharacterMock } from '../mocks/character'

const Char = () => {
  return (
    <>
      <CharacterCard
        name={CharacterMock.name}
        status={CharacterMock.status}
        species={CharacterMock.species}
        image={CharacterMock.image}
        location={CharacterMock.location}
        origin={CharacterMock.origin}
      />
      <br />
      <CharacterCard
        name={CharacterMock.name}
        status={CharacterMock.status}
        species={CharacterMock.species}
        image={CharacterMock.image}
        location={CharacterMock.location}
        origin={CharacterMock.origin}
      />
      <br />
      <CharacterCard
        name={CharacterMock.name}
        status={CharacterMock.status}
        species={CharacterMock.species}
        image={CharacterMock.image}
        location={CharacterMock.location}
        origin={CharacterMock.origin}
      />
    </>
  )
}

export default Char
