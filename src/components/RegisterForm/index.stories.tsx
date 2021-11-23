import React from 'react'

import { Meta, Story } from '@storybook/react'

import RegisterForm from '.'

export default {
  component: RegisterForm,
  title: 'Components/RegisterForm'
} as Meta

export const RegisterFormRegular: Story = () => <RegisterForm />
