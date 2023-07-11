import { styled } from 'styled-components'

import { ProjectDetails } from './project-details'

export default {
	title: 'dkat4/UI'
}

export const ProjectDetailsStory = () => {
	return <Container>
				<ProjectDetails/>
			</Container>
}
ProjectDetailsStory.storyName = 'Project Details'

const Container= styled.div`
`