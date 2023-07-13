import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import * as Design from '../design'

import { ProjectData } from './project-details'

interface Props {
	projects : Array<ProjectData>
	selectedProject? : ProjectData
	onProjectSelection : (project:ProjectData) => void
}

export const MainNavigation = (props:Props) => {

	const [selectedProject, setSelectedProject] = useState(props.selectedProject)

	const firstProject = useRef(null)

	useEffect(() => {
		setSelectedProject(props.selectedProject)
	}, [props.selectedProject])

	const selectProject = (project:ProjectData) => {
		setSelectedProject(project)
		props.onProjectSelection(project)
	}

	return	<Container>
				<ScreenContent $projectSelected={selectedProject !== undefined}>
					initial screen content placeholder
					<Button onClick={()=>{
						firstProject.current.scrollIntoView({behavior: 'smooth', block: 'center'})
					}}>
						scroll to projects
					</Button>
				</ScreenContent>

				<ProjectsHeader $projectSelected={selectedProject !== undefined}
								onClick={()=>{
									selectProject(undefined)
								}}>
					selected projects
				</ProjectsHeader>

				{
				props.projects.map((project, i) => {
					return	<Project	ref={i===0 ? firstProject : undefined}
										$projectSelected={selectedProject !== undefined}
										key={i} onClick={()=>{
											selectProject(project)
										}}>
								{ project.title } #{ i + 1 }
							</Project>	
				})
				}
			</Container>
}

const Container = styled.div`
	user-select: none;

	display: grid;
	justify-items: center;

	position: fixed;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;

	padding-bottom: 25vh;	

	overflow: scroll;

	scroll-snap-type: y mandatory;

	@media (${Design.onMobileAspectRatio}) {
		scroll-snap-type: none;
	}
`

const HideOnProject= styled.div<{$projectSelected:boolean}>`
	opacity: ${props => props.$projectSelected ? 0 : 1};
	transition: 1s all;
`

const ScreenContent = styled(HideOnProject)`
	width: 100vw;
	height: 100vh;


	display: grid;
	place-items: center;

	scroll-snap-align: center;
`

const ProjectsHeader = styled(HideOnProject)`
	background: rgba(0,0,0,0.7);
	color: #eee;
	width: 100vw;

	padding: 1vh 0vh;
	margin-top: 15vh;
	margin-bottom: 15vh;

	position: sticky;
	top: 0vh;
`

const Project = styled(HideOnProject)`
	width: 60vh;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	background: rgba(200,200,200,0.5);
	color: #555;
	border: 3px solid ${Design.Colors.Orange};

	opacity: ${props => props.$projectSelected ? 0 : 1};
	transition: 1s all;

	display: grid;
	place-items: center;

	scroll-snap-align: center;

	@media (${Design.onMobileAspectRatio}) {
		width: 100vw;
		height: 100vw;

		margin-top: 5vw;
		margin-bottom: 5vw;
	}
`

// - - - - - - - - - - - - - - - - - - - - - - - - temp

const Button = styled.div`
	color: #555;
	background: #bbb;
	padding: 5px;

	display: inline;

	&:hover {
		background: #ddd;	
		color: #333;	
	}
`
