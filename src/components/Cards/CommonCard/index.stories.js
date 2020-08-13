import React from 'react'

import CommonCard from './index'

import { NAPSTER_IMAGE_SIZES, CARD_TYPES } from '../../../constants'

const NAPSTER_ENTITIES_IDS = [
  'Art.28463069',
  'Alb.54719066',
  'g.115',
  'pp.181335817',
  'ps.147088912',
]

export default {
  component: CommonCard,
  title: 'CommonCard',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  argTypes: {
    napsterImageId: {
      control: { type: 'select', options: [null, ...Object.values(NAPSTER_ENTITIES_IDS)] },
    },
    napsterImageSize: {
      control: { type: 'select', options: [null, ...Object.values(NAPSTER_IMAGE_SIZES)] },
    },
    type: { control: { type: 'select', options: [null, ...Object.values(CARD_TYPES)] } },
    imageType: { control: { type: 'select', options: [null, ...Object.values(CARD_TYPES)] } },
  },
}

const Template = (args) => <CommonCard {...args} />

export const Column = Template.bind({})
export const Row = Template.bind({})

Column.args = {
  type: 'playlist',
  napsterImageId: 'pp.181335817',
  imageSize: 'xs',
  title: 'Card title',
  subtitle: 'Card subtitle',
}
Column.argTypes = {
  format: { defaultValue: 'row' },
}

Row.args = {
  type: 'playlist',
  napsterImageId: 'pp.181335817',
  imageSize: 'xs',
  title: 'Card title',
  subtitle: 'Card subtitle',
}
