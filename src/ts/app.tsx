import { createContext, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from './design'

import { ThreeFiberSVGExtrusion } from './components/dev/three-fiber-svg-extrusion'
import { MainNavigation } from './components/main-navigation'
import { ProjectRouter } from './components/project-router'

import { sampleProjects } from './components/dev/sample-data'

const ThemeA:Design.ColorTheme = {
	primary : Design.Colors.Orange,
	background : Design.Colors.Yellow
}

const ThemeB:Design.ColorTheme = {
	primary : Design.Colors.Yellow,
	background : Design.Colors.Orange
}

export const ColorThemeContext = createContext<Design.ColorTheme>(ThemeA)

export const App = (props:any) => {

	const [selectedProject, setSelectedProject] = useState(undefined)
	const [theme, setTheme] = useState(ThemeA)

	return	<Container>

				<ColorThemeContext.Provider value={theme}>

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

					<ThemeSwitcher onClick={()=>{
						setTheme(theme === ThemeA ? ThemeB : ThemeA)
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
