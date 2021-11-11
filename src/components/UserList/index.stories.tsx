import React from 'react'

import { Meta } from '@storybook/react'

import UserList from '.'

export default {
  component: UserList,
  title: 'Components/UserList'
} as Meta

export const UserListDefault: any = () => <UserList />
