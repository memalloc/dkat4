// import React from 'react'
// import { ComponentStory, ComponentMeta } from '@storybook/react'
// import styled from 'styled-components'

import { LoremIpsum } from "./lorem-ipsum"
import { ResponsiveLayoutTrial } from "./responsive-layout-trial"

export default {
  title: 'dkat4/Dev Components'
}

export const LoremIpsumStory = () => <LoremIpsum/>

export const ResponsiveLayout = () => <ResponsiveLayoutTrial/>
ResponsiveLayout.storyName = 'ResponsiveLayoutTrial'