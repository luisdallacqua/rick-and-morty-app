import CharacterCard from '../components/CharecterCard'
import { CharacterMock } from '../mocks/character'

const Char = () => {
  return (
    <>
      <CharacterCard
        name={CharacterMock[0].name}
        status={CharacterMock[0].status}
        species={CharacterMock[0].species}
        image={CharacterMock[0].image}
        location={CharacterMock[0].location}
        origin={CharacterMock[0].origin}
      />
      <br />
      <CharacterCard
        name={CharacterMock[1].name}
        status={CharacterMock[1].status}
        species={CharacterMock[1].species}
        image={CharacterMock[1].image}
        location={CharacterMock[1].location}
        origin={CharacterMock[1].origin}
      />
      <br />
      <CharacterCard
        name={CharacterMock[2].name}
        status={CharacterMock[2].status}
        species={CharacterMock[2].species}
        image={CharacterMock[2].image}
        location={CharacterMock[2].location}
        origin={CharacterMock[2].origin}
      />
    </>
  )
}

export default Char
