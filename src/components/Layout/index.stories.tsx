import React from 'react'

import { Meta, Story } from '@storybook/react'

import Layout from '.'

export default {
  component: Layout,
  title: 'Components/Layout'
} as Meta

export const LayoutSideBar: Story = (args) => <Layout {...args} />

LayoutSideBar.args = {
  children: 'alguma coisa'
}
