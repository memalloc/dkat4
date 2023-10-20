import { styled } from 'styled-components'

import { ProjectDetails } from './project-details'
import { sampleProject } from './dev/sample-data'
import { useContext } from 'react'
import { ColorThemeContext } from '../app'

export default {
	title: 'dkat4/UI'
}

export const ProjectDetailsStory = () => {
	const colorTheme = useContext(ColorThemeContext)
	return <Container>
				<BackgroundPlaceholder $color={colorTheme.background}/>
				<ProjectDetails project={sampleProject} onViewModeUpdate={() => {}}/>
			</Container>
}
ProjectDetailsStory.storyName = 'Project Details'

const Container= styled.div`
`

const BackgroundPlaceholder = styled.div<{$color:string}>`
	background: ${props => props.$color};
	position: fixed;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
`