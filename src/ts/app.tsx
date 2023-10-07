import { createContext, useEffect, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from './design'

import { AnimationMode, ThreeBackgroundScene } from './components/three-background-scene'
import { MainNavigation } from './components/main-navigation'
import { ProjectRouter } from './components/project-router'

import { ThemeSwitcher } from './components/theme-switcher'

import { sampleProjects } from './components/dev/sample-data'
import { Projects } from '../../temp-dev-data/data'

const projects  = Projects

export const ColorThemeContext = createContext<Design.ColorTheme>(Design.BaseTheme)

export const App = (props:any) => {

	const [selectedProject, setSelectedProject] = useState(undefined)
	const [theme, setTheme] = useState(Design.BaseTheme)
	const [initialScrollPosition, setInitialScrollPosition] = useState(true)
	const [initialMode , setInitialMode] = useState<AnimationMode>('initial')

	useEffect(()=>{
		let timeout
		if(initialScrollPosition){
			setInitialMode('initial')
			timeout = setTimeout(()=>{
				setInitialMode('idle')
			}, 1000 * 20)
		}
		return () => { clearTimeout(timeout) }
	}, [initialScrollPosition])

	const bgMode = initialScrollPosition ? initialMode :
						selectedProject ? 'background' : 'projects'
	const activeTheme = (selectedProject && selectedProject.theme) ?
						selectedProject.theme : theme

	return	<Container>

				<ColorThemeContext.Provider value={activeTheme}>

					<ThreeBackgroundScene mode={bgMode}/>

					<MainNavigation projects={projects}
									selectedProject={selectedProject}
									onScroll={(initialPosition)=>{
										setInitialScrollPosition(initialPosition)
									}}
									onProjectSelection={(project) => {
										setSelectedProject(project)
									}}/>

					<ProjectRouter	projects={projects}
									selectedProject={selectedProject}
									onProjectSelection={(project) => {
										setSelectedProject(project)
									}}/>

					<ThemeSwitcher	hidden={selectedProject && selectedProject.theme}
									onThemeChange={(theme) => {
										setTheme(theme)
									}}/>

				</ColorThemeContext.Provider>
								
			</Container>
}

const Container = styled.div`
`

