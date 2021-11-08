import CharacterCard, { CharacterProps } from '../components/CharecterCard'
import { CharacterMock } from '../mocks/character'

const Char = () => {
  return (
    <>
      <CharacterCard
        name={CharacterMock.name}
        status={CharacterMock.status}
        image={CharacterMock.image}
        location={CharacterMock.location}
        origin={CharacterMock.origin}
      />
      <CharacterCard
        name={CharacterMock.name}
        status={CharacterMock.status}
        image={CharacterMock.image}
        location={CharacterMock.location}
        origin={CharacterMock.origin}
      />
      <CharacterCard
        name={CharacterMock.name}
        status={CharacterMock.status}
        image={CharacterMock.image}
        location={CharacterMock.location}
        origin={CharacterMock.origin}
      />
    </>
  )
}

export default Char
