import { styled } from 'styled-components'

import { ProjectDetails } from './project-details'
import { sampleProject } from './dev/sample-data'

export default {
	title: 'dkat4/UI'
}

export const ProjectDetailsStory = () => {
	return <Container>
				<ProjectDetails project={sampleProject}/>
			</Container>
}
ProjectDetailsStory.storyName = 'Project Details'

const Container= styled.div`
`