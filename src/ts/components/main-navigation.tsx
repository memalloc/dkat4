import { useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import * as Design from '../design'

import { ProjectData } from './project-details'

interface Props {
	projects : Array<ProjectData>
	onProjectSelection : (project:ProjectData) => void
}

export const MainNavigation = (props:Props) => {

	const [selectedProject, setSelectedProject] = useState(undefined)

	const firstProject = useRef(null)

	return	<Container>
				<ScreenContent>
					initial screen content placeholder
					<Button onClick={()=>{
						firstProject.current.scrollIntoView({behavior: 'smooth', block: 'center'})
					}}>
						scroll to projects
					</Button>
				</ScreenContent>

				<ProjectsHeader onClick={()=>{
					setSelectedProject(undefined)
				}}>
					selected projects
				</ProjectsHeader>

				{
				props.projects.map((project, i) => {
					return	<Project	ref={i===0 ? firstProject : undefined}
										$projectSelected={selectedProject !== undefined}
										key={i} onClick={()=>{
											setSelectedProject(project)
											props.onProjectSelection(project)
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

const ScreenContent = styled.div`
	width: 100vw;
	height: 100vh;


	display: grid;
	place-items: center;

	scroll-snap-align: center;
`

const ProjectsHeader = styled.div`
	background: rgba(0,0,0,0.7);
	color: #eee;
	width: 100vw;

	padding: 1vh 0vh;
	margin-top: 15vh;
	margin-bottom: 15vh;

	position: sticky;
	top: 0vh;

	z-index: 100;
`

const Project = styled.div<{$projectSelected:boolean}>`
	width: 60vh;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	background: #ddd;
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
