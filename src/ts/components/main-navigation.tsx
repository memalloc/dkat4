import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import * as Design from '../design'
import * as Helper from '../helper'

import { ProjectData } from './project-details'
import { ProjectPreview } from './project-preview'
import { Markdown } from './markdown'
import { ColorThemeContext } from '../app'

interface Props {
	projects : Array<ProjectData>
	selectedProject? : ProjectData
	onProjectSelection : (project:ProjectData) => void
	onInitialScrollPositionChange : (initialPosition:boolean) => void
}

export const MainNavigation = (props:Props) => {

	const [selectedProject, setSelectedProject] = useState(props.selectedProject)
	const [projectInView, setProjectInView] = useState(undefined)
	const [initialScrollPosition, setInitialScrollPosition] = useState(true)

	const firstProject = useRef(null)

	useEffect(() => {
		setSelectedProject(props.selectedProject)
	}, [props.selectedProject])

	const selectProject = (project:ProjectData) => {
		setSelectedProject(project)
		props.onProjectSelection(project)
	}

	const containerRef = useRef(null)

	useEffect(()=>{
		const element = containerRef.current

		const scroll = event => {
			const initialPosition = element.scrollTop <= element.clientHeight
			setInitialScrollPosition(initialPosition)
		}

		element.addEventListener('scroll', scroll)

		return () => {
			element.removeEventListener('scroll', scroll)
		}
	}, [containerRef])

	useEffect(()=>{
		props.onInitialScrollPositionChange(initialScrollPosition)
	}, [initialScrollPosition])

	const colorTheme = useContext(ColorThemeContext)

	return	<Container ref={containerRef}>
				<ScreenContent $projectSelected={selectedProject !== undefined}>
					initial screen content placeholder
					<Button onClick={()=>{
						firstProject.current.scrollIntoView({behavior: 'smooth', block: 'center'})
					}}>
						scroll to projects
					</Button>
				</ScreenContent>

				<ProjectsHeader $projectSelected={selectedProject !== undefined}
								$color={colorTheme.primary}
								onClick={()=>{
									selectProject(undefined)
								}}>
					<SelectedProjects layout>
						Selected Projects
					</SelectedProjects>
					<HiddenTitle>
						<Markdown disableParagraphMargin>
							{ projectInView ? projectInView.title : "_" }
						</Markdown>
					</HiddenTitle>
				</ProjectsHeader>

				{
				props.projects.map((project, i) => {
					return	<ProjectPreview	key={i}
											ref={i===0 ? firstProject : undefined}
											project={project}
											projectSelected={selectedProject !== undefined}
											onInView={(project)=>{
												setProjectInView(project)
											}}
											onClick={()=>{
												selectProject(project)
											}}/>
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
	transition: ${Helper.onSafari ? 'unset' : '1s all'};
`

const ScreenContent = styled(HideOnProject)`
	width: 100vw;
	height: 100vh;


	display: grid;
	place-items: center;

	scroll-snap-align: center;
`

const ProjectsHeader = styled(HideOnProject)<{$color:string}>`
	font-family: Arvo;
	font-size: 30px;

	color: ${props => props.$color};

	position: sticky;
	top: 0vh;
	height: 16.5vh;
	width: 97vw;

	margin-left: 3vw;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;
`

const SelectedProjects = styled(motion.div)`
	font-family: ArvoBoldItalic;
	letter-spacing: 0.5px;
	margin-bottom: 5px;
	padding: 0px 2px;

	border: 2px solid transparent;
    transform: translateX(-5px);
`

const HiddenTitle = styled.div`
	opacity: 0;
	width: 30vw
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
