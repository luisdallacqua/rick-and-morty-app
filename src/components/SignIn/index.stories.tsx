import React from 'react'

import { Meta } from '@storybook/react'

import SignIn from '.'

export default {
  component: SignIn,
  title: 'Components/SignIn'
} as Meta

export const FormSignIn: any = () => <SignIn />
