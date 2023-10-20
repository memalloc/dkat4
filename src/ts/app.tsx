import { createContext, useEffect, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from './design'

import { AnimationMode, ThreeBackgroundScene } from './components/three-background-scene'
import { MainNavigation } from './components/main-navigation'
import { ProjectRouter } from './components/project-router'

import { ThemeSwitcher } from './components/theme-switcher'

// Because of the storage requirements of the media featured on the site
// its content is actually not contained inside this repository (see .gitignore).
// The reason for this is to avoid potential issues from accumulating LFS storage
// in particular due to updates to videos.
// To build the site without the content directory simply remove or comment
// the import of the unversioned file and switch the projects declaration
// to the provided sampleProjects.

import { sampleProjects } from './components/dev/sample-data'
import { Projects } from '../../content/data' // unversioned data - see comment above
const projects  = Projects // switch with sampleProjects if necessary

export const ColorThemeContext = createContext<Design.ColorTheme>(Design.BaseTheme)

export const App = (props:any) => {

	const [selectedProject, setSelectedProject] = useState(undefined)
	const [projectDetailsVisible, setProjectDetailsVisible] = useState(false)

	const [theme, setTheme] = useState(Design.BaseTheme)
	const [initialScrollPosition, setInitialScrollPosition] = useState(true)
	const [initialMode , setInitialMode] = useState<AnimationMode>('initial')

	useEffect(()=>{
		let timeout
		if(initialScrollPosition){
			setInitialMode('initial')
			timeout = setTimeout(()=>{
				setInitialMode('idle')
			}, 1000 * 8)
		}
		return () => { clearTimeout(timeout) }
	}, [initialScrollPosition])


	const bgMode = selectedProject ? 'background' :
						initialScrollPosition ? initialMode : 'projects'
	const activeTheme = (selectedProject && selectedProject.theme) ?
						selectedProject.theme : theme

	useEffect(()=>{
		document.body.style.backgroundColor = activeTheme.background	
	}, [activeTheme])

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
										setProjectDetailsVisible(true)
									}}/>

					<ProjectRouter	projects={projects}
									selectedProject={selectedProject}
									onProjectSelection={(project) => {
										setSelectedProject(project)
									}}
									onProjectViewModeUpdate={(detailsVisible) => {
										setProjectDetailsVisible(detailsVisible)
									}}/>

					<ThemeSwitcher	hidden={selectedProject && (selectedProject.theme || !projectDetailsVisible)}
									onThemeChange={(theme) => {
										setTheme(theme)
									}}/>

				</ColorThemeContext.Provider>
								
			</Container>
}

const Container = styled.div`
`

