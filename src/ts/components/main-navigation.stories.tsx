import { styled } from 'styled-components'
import { MainNavigation } from './main-navigation'

import { sampleProject } from './dev/sample-data'

export default {
	title: 'dkat4/UI'
}

export const MainNavigationStory = () => {
	return <Container>
				<MainNavigation projects={projects} onProjectSelection={(project) => {
					console.log(`selected project ${project.title}`, project)
				}}/>
			</Container>
}
MainNavigationStory.storyName = 'Main Navigation'

const projects = [sampleProject, sampleProject, sampleProject, sampleProject, sampleProject]

const Container= styled.div`
	width: 100vw;
	height: 100vh;
	background: url("https://placehold.co/1920x1080");
	background-size: cover;
	background-position: center;
`