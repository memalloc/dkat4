// import React from 'react'
// import { ComponentStory, ComponentMeta } from '@storybook/react'
// import styled from 'styled-components'

import { LoremIpsum } from "./lorem-ipsum"
import { ResponsiveLayoutTrial } from "./responsive-layout-trial"
import { SinglePageProjectsTrial } from "./single-page-projects-trial"
import { ThreeBase } from "./three-base"
import { ThreeSVGExtrusion } from "./three-svg-extrusion"
import { ThreeFiberSVGExtrusion } from "./three-fiber-svg-extrusion"

export default {
  title: 'dkat4/Dev Components'
}

export const LoremIpsumStory = () => <LoremIpsum/>

export const ResponsiveLayout = () => <ResponsiveLayoutTrial/>
ResponsiveLayout.storyName = 'ResponsiveLayoutTrial'

export const SinglePageProjects = () => <SinglePageProjectsTrial/>
SinglePageProjects.storyName = 'SinglePageProjectsTrial'

export const ThreeBaseSetup = () => <ThreeBase/>
ThreeBaseSetup.storyName = 'Three Base'

export const SVGExtrusion = () => <ThreeSVGExtrusion/>
SVGExtrusion.storyName = 'Three SVG Extrusion'

export const ThreeFiberExtrusion = () => <ThreeFiberSVGExtrusion mode='initial'/>
ThreeFiberExtrusion.storyName = 'React Three Fiber SVG Extrusion'
