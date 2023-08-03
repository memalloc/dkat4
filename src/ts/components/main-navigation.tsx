import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import * as Design from '../design'
import * as Helper from '../helper'

import { ProjectData } from './project-details'
import { ProjectPreview } from './project-preview'
import { Markdown } from './markdown'
import { ColorThemeContext } from '../app'
import { LandingScreenContent } from './landing-screen-content'

interface Props {
	projects : Array<ProjectData>
	selectedProject? : ProjectData
	onProjectSelection : (project:ProjectData) => void
	onScroll : (initialPosition:boolean) => void
}

export const MainNavigation = (props:Props) => {

	const [selectedProject, setSelectedProject] = useState(props.selectedProject)
	const [projectInView, setProjectInView] = useState(undefined)

	const projectRefs = useRef([])

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
			const initialPosition = element.scrollTop <= element.clientHeight * 0.2
			props.onScroll(initialPosition)
		}

		element.addEventListener('scroll', scroll)

		return () => {
			element.removeEventListener('scroll', scroll)
		}
	}, [containerRef])

	const scrollToProject = i => projectRefs.current[i].scrollIntoView({behavior: 'smooth', block: 'center'})

	const colorTheme = useContext(ColorThemeContext)

	return	<Container ref={containerRef}>
				<ScreenContent $projectSelected={selectedProject !== undefined}>
					<LandingScreenContent onScrollToProjects={() => scrollToProject(0)}/>
				</ScreenContent>

				<ProjectsHeader $projectSelected={selectedProject !== undefined}
								$color={colorTheme.primary}
								onClick={()=>{
									selectProject(undefined)
								}}>
					<SelectedProjects layout>
						Selected Projects
					</SelectedProjects>
					<ProjectTitle animate={{opacity : projectInView ? 1 : 0 }}>
					{
						projectInView &&
						<Markdown disableParagraphMargin>
							{ projectInView.title }
						</Markdown>
					}
					</ProjectTitle>
				</ProjectsHeader>
				{
				props.projects.map((project, i) => {
					return	<ProjectPreview	key={i}
											ref={ref => projectRefs.current[i] = ref}
											project={project}
											projectSelected={selectedProject !== undefined}
											onInView={(project)=>{
												setProjectInView(project)
											}}
											onClick={()=>{scroll
												if(projectInView === project){
													selectProject(project)
												} else {
													scrollToProject(i)
												}
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

	overflow-y: scroll;
	overflow-x: clip;

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
	font-family: ArvoRegular;
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

	@media (${Design.onMobileAspectRatio}) {
		position: static;
		height: 80px;
    	justify-content: center;
	}
`

const SelectedProjects = styled(motion.div)`
	font-family: ArvoBoldItalic;
	letter-spacing: 0.5px;
	margin-bottom: 5px;
	padding: 0px 2px;

	border: 2px solid transparent;
    transform: translateX(-5px);
`

const ProjectTitle = styled(motion.div)`
	width: 30vw;
	@media (${Design.onMobileAspectRatio}) {
		display: none;
	}
`
