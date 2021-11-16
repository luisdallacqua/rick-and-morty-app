import React from 'react'

import { Meta, Story } from '@storybook/react'

import BasicModal from '.'
import { ModalProps } from '.'
import CharacterCard from '../CharecterCard'
import { CharacterMock } from '../../mocks/character'

export default {
  component: BasicModal,
  title: 'Components/Modal'
} as Meta

export const SimpleModal: Story<ModalProps> = (args) => <BasicModal {...args} />

SimpleModal.args = {
  textButton: 'Salve zé pretinh',
  textModalHeader: 'Salve simpatia',
  children: (
    <CharacterCard
      name={CharacterMock[0].name}
      status={CharacterMock[0].status}
      species={CharacterMock[0].species}
      image={CharacterMock[0].image}
      location={CharacterMock[0].location}
      origin={CharacterMock[0].origin}
    />
  )
}
