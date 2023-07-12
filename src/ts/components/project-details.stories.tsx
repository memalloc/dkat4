import { styled } from 'styled-components'

import { ProjectDetails, Project } from './project-details'

import TestVideo from '../../assets/video/test.mp4'
import { text } from './dev/lorem-ipsum'

export default {
	title: 'dkat4/UI'
}

export const ProjectDetailsStory = () => {
	return <Container>
				<ProjectDetails project={project}/>
			</Container>
}
ProjectDetailsStory.storyName = 'Project Details'

const project:Project = {
	title : `Verkehrsmuseum Remise`,
	info : `Work: Design & Development  \nClient: Wiener Linien  \nAgency: Zone Media`,
	description : `Project Description, ${text}`,
	media : [TestVideo, 'https://placehold.co/800x800', 'https://placehold.co/1920x1080', 'https://placehold.co/90x160']
}

const Container= styled.div`
`