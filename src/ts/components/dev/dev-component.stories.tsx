// import React from 'react'
// import { ComponentStory, ComponentMeta } from '@storybook/react'
// import styled from 'styled-components'

import { LoremIpsum } from "./lorem-ipsum"
import { ResponsiveLayoutTrial } from "./responsive-layout-trial"
import { ThreeBase } from "./three-base"
import { ThreeSVGExtrusion } from "./three-svg-extrusion"

export default {
  title: 'dkat4/Dev Components'
}

export const LoremIpsumStory = () => <LoremIpsum/>

export const ResponsiveLayout = () => <ResponsiveLayoutTrial/>
ResponsiveLayout.storyName = 'ResponsiveLayoutTrial'

export const ThreeBaseSetup = () => <ThreeBase/>
ThreeBaseSetup.storyName = 'Three Base'

export const SVGExtrusion = () => <ThreeSVGExtrusion/>
ThreeBaseSetup.storyName = 'Three SVG Extrusion'
