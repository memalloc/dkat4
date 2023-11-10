import { Fragment, useEffect } from "react"
import { HashRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import * as Helper from '../helper'

import { ProjectData, ProjectDetails } from "./project-details"

interface Props {
	projects : Array<ProjectData>
	selectedProject? : ProjectData
	onProjectSelection : (project:ProjectData) => void
	onProjectViewModeUpdate : (detailsVisible:boolean) => void
}

export const ProjectRouter = (props:Props) => {
	return	<HashRouter>
				<AnimatedRouter {...props}/>
			</HashRouter>
}

const initialTitle = document.title

const AnimatedRouter = (props:Props) => {

	const location = useLocation()
	const navigate = useNavigate()

	// navigate to project address if the project selection does
	// not match the current location (triggered by MainNavigation)
	useEffect(()=>{
		if(props.selectedProject){
			const target = `/project/${props.selectedProject.id}` 
			if(target !== location.pathname){
				navigate(target)
			}
		}
	}, [props.selectedProject])

	// clear project selection and detail state when the location
	// changes to root level, for example by using the back button
	useEffect(() => {
		if(location.pathname === '/' && props.selectedProject){
			props.onProjectSelection(undefined)
			props.onProjectViewModeUpdate(true)
		}
		document.title = props.selectedProject ? `Daniel Kauer | ${props.selectedProject.title}` : initialTitle
	}, [location.pathname])

	const Root = <Fragment/> // just used to avoid warning for missing element
	const Project = <ProjectRoute {...props}/>

	return	<AnimatePresence>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={Root}/>
					<Route path='/project/:id' element={Project} />
				</Routes>
			 </AnimatePresence>
}

const ProjectRoute = (props:Props) => {

	const { id } = useParams()
	const project = props.projects.find(p => p.id === id)

	if(project === undefined){
		console.warn(`no project found with id ${id}`)
	}

	// fix project selection if it does not match the location
	const location = useLocation()
	useEffect(() => {
		if(props.selectedProject !== project){
			props.onProjectSelection(project)
		}
	}, [location.pathname])

	if(Helper.onSafari){
		return <div>
				{
					project &&
					<ProjectDetails project={project} onViewModeUpdate={props.onProjectViewModeUpdate}/>
				}
				</div>
	} else {
		return <motion.div initial={{opacity:0}}
							animate={{opacity:1}}
							transition={{duration:0.5}}
							exit={{opacity:0}}>
				{
					project &&
					<ProjectDetails project={project} onViewModeUpdate={props.onProjectViewModeUpdate}/>
				}
				</motion.div>

	}
}