import { createContext, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from './design'

import { ThreeFiberSVGExtrusion } from './components/dev/three-fiber-svg-extrusion'
import { MainNavigation } from './components/main-navigation'
import { ProjectRouter } from './components/project-router'

import { sampleProjects } from './components/dev/sample-data'
import { ThemeSwitcher } from './components/theme-switcher'

export const ColorThemeContext = createContext<Design.ColorTheme>(Design.BaseTheme)

export const App = (props:any) => {

	const [selectedProject, setSelectedProject] = useState(undefined)
	const [theme, setTheme] = useState(Design.BaseTheme)
	const [initialScrollPosition, setInitialScrollPosition] = useState(true)

	const bgMode = initialScrollPosition ? 'initial' :
						selectedProject ? 'background' : 'projects'

	return	<Container>

				<ColorThemeContext.Provider value={theme}>

					<ThreeFiberSVGExtrusion mode={bgMode}/>

					<MainNavigation projects={sampleProjects}
									selectedProject={selectedProject}
									onScroll={(initialPosition)=>{
										setInitialScrollPosition(initialPosition)
									}}
									onProjectSelection={(project) => {
										setSelectedProject(project)
									}}/>

					<ProjectRouter	projects={sampleProjects}
									selectedProject={selectedProject}
									onProjectSelection={(project) => {
										setSelectedProject(project)
									}}/>

					<ThemeSwitcher onThemeChange={(theme) => {
						setTheme(theme)
					}}/>

				</ColorThemeContext.Provider>
								
			</Container>
}

const Container = styled.div`
`

