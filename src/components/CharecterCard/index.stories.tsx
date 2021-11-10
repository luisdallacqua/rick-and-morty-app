import React from 'react'

import { Meta } from '@storybook/react'

import CharacterCard from '.'
import { CharacterMock } from '../../mocks/character'

export default {
  component: CharacterCard,
  title: 'Components/CharacterCard'
} as Meta

export const CharacterCard1: any = () => (
  <CharacterCard
    name={CharacterMock.name}
    status={CharacterMock.status}
    species={CharacterMock.species}
    image={CharacterMock.image}
    location={CharacterMock.location}
    origin={CharacterMock.origin}
  />
)
