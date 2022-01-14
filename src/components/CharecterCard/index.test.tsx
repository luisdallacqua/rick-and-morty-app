import { screen } from '@testing-library/react'
import React from 'react'

import CharacterCard from '.'
import { renderWithTheme } from '../../utils/tests/helper'

const props = {
  isFavorited: false,
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
    renderWithTheme(<CharacterCard {...props} />)

    expect(screen.getByText(props.name)).toBeInTheDocument()
  })
})
