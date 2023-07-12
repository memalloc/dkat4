import { styled } from 'styled-components'
import { MainNavigation } from './main-navigation'

import { sampleProjects } from './dev/sample-data'

export default {
	title: 'dkat4/UI'
}

export const MainNavigationStory = () => {
	return <Container>
				<MainNavigation projects={sampleProjects} onProjectSelection={(project) => {
					console.log(`selected project ${project.title}`, project)
				}}/>
			</Container>
}
MainNavigationStory.storyName = 'Main Navigation'


const Container= styled.div`
	width: 100vw;
	height: 100vh;
	background: url("https://placehold.co/1920x1080");
	background-size: cover;
	background-position: center;
`