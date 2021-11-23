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
    name={CharacterMock[0].name}
    status={CharacterMock[0].status}
    species={CharacterMock[0].species}
    image={CharacterMock[0].image}
    location={CharacterMock[0].location}
    origin={CharacterMock[0].origin}
  />
)
