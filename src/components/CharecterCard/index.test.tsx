import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CharacterCard from '.'

const props = {
  id: 1,
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  gender: 'Masculine',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Earth' },
  origin: { name: 'Earth' }
}

describe('<CharacterCard />', () => {
  it('should render correctly', () => {
    render(<CharacterCard {...props} />)

    expect(screen.getByText(props.name)).toBeInTheDocument()
  })
})
