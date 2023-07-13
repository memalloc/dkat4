import { useState } from 'react'
import { styled } from 'styled-components'

import { ThreeFiberSVGExtrusion } from './components/dev/three-fiber-svg-extrusion'
import { MainNavigation } from './components/main-navigation'
import { ProjectRouter } from './components/project-router'

import { sampleProjects } from './components/dev/sample-data'

export const App = (props:any) => {

	const [selectedProject, setSelectedProject] = useState(undefined)

	return	<Container>

				<ThreeFiberSVGExtrusion/>

				<MainNavigation projects={sampleProjects}
								selectedProject={selectedProject}
								onProjectSelection={(project) => {
									setSelectedProject(project)
								}}/>

				<ProjectRouter	projects={sampleProjects}
								selectedProject={selectedProject}
								onProjectSelection={(project) => {
									setSelectedProject(project)
								}}/>
								
			</Container>
}

const Container = styled.div`
`