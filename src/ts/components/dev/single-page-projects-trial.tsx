import { useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import { ResponsiveLayoutTrial } from './responsive-layout-trial'

export const SinglePageProjectsTrial = (props:any) => {

	const [selectedProject, setSelectedProject] = useState(undefined)
	const firstProject = useRef(null)

	const projects = [1,2,3,4,5,6,7,8]

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
				projects.map((project, i) => {
					return	<Project	ref={i===0 ? firstProject : undefined}
										key={i} onClick={()=>{
											setSelectedProject(project)
										}}>
								Project #{i+1}
							</Project>	
				})
				}

				<AnimatePresence>
				{
					selectedProject &&
					<motion.div initial={{opacity:0}}
								animate={{opacity:1}}
								exit={{opacity:0}}>
						<ResponsiveLayoutTrial/>
					</motion.div>
				}
				</AnimatePresence>

			</Container>
}

const onMobileAspectRatio = 'max-aspect-ratio: 6/10'

const Container = styled.div`
	user-select: none;
	font-family: ArvoRegular;
	background: #aaa;

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

	@media (${onMobileAspectRatio}) {
		scroll-snap-type: none;
	}
`

const ScreenContent = styled.div`
	width: 100vw;
	height: 100vh;

	background: #555;
	color: #bbb;

	display: grid;
	place-items: center;

	scroll-snap-align: center;
`

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

const Project = styled.div`
	width: 60vh;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	background: #ddd;
	color: #555;

	display: grid;
	place-items: center;

	scroll-snap-align: center;

	@media (${onMobileAspectRatio}) {
		width: 100vw;
		height: 100vw;

		margin-top: 5vw;
		margin-bottom: 5vw;
	}
`