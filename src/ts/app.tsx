import { createContext, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from './design'

import { ThreeFiberSVGExtrusion } from './components/dev/three-fiber-svg-extrusion'
import { MainNavigation } from './components/main-navigation'
import { ProjectRouter } from './components/project-router'

import { sampleProjects } from './components/dev/sample-data'

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

					<ThemeSwitcher onClick={()=>{
						setTheme(theme === Design.BaseTheme ? Design.ThemeA : Design.BaseTheme)
					}}>
						switch
					</ThemeSwitcher>

				</ColorThemeContext.Provider>
								
			</Container>
}

const Container = styled.div`
`

const ThemeSwitcher = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	width: 100px;
	height: 100px;

	background: red;
	color: black;

	border: 3px solid: green;
	border-radius: 300px;

	display: grid;
	place-items: center;
	user-select: none;
`
