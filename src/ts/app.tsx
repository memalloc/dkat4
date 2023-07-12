import { styled } from 'styled-components'

import { ThreeFiberSVGExtrusion } from './components/dev/three-fiber-svg-extrusion'
import { MainNavigation } from './components/main-navigation'
import { sampleProjects } from './components/dev/sample-data'

export const App = (props:any) => {

	return	<Container>
				<ThreeFiberSVGExtrusion/>
				<MainNavigation projects={sampleProjects} onProjectSelection={(project) => {
					console.log(`selected project ${project.title}`, project)
				}}/>
			</Container>
}

const Container = styled.div`
`