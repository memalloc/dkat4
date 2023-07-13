import { styled } from 'styled-components'

import { ProjectDetails } from './project-details'
import { sampleProject } from './dev/sample-data'

export default {
	title: 'dkat4/UI'
}

export const ProjectDetailsStory = () => {
	return <Container>
				<BackgroundPlaceholder/>
				<ProjectDetails project={sampleProject}/>
			</Container>
}
ProjectDetailsStory.storyName = 'Project Details'

const Container= styled.div`
`

const BackgroundPlaceholder = styled.div`
	background: #172C32;
	position: fixed;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
`