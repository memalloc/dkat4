import { forwardRef, useEffect, useRef } from "react"
import styled from "styled-components"
import { useInView } from "framer-motion"

import * as Design from '../design'

import { ProjectData } from "./project-details"

interface Props {
	project : ProjectData
	projectSelected : boolean
	onClick : ()=>void
	onInView : (project:ProjectData)=>void
}

export const ProjectPreview = forwardRef((props:Props, ref:React.RefObject<Element>) => {

	const inViewRef = useRef(null)
	const isInView = useInView(inViewRef, { margin : "-50%" })

	useEffect(()=>{
		if(isInView){
			props.onInView(props.project)
		}
	}, [isInView])	


	return	<Project	ref={ref}
						$projectSelected={props.projectSelected}
						onClick={props.onClick}>
				<Content ref={inViewRef}>
					{ props.project.title }
				</Content>
			</Project>	
	
})

const Project = styled.div<{$projectSelected:boolean,ref:any}>`
	width: 60vh;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	color: #555;
	border: 3px solid ${Design.Colors.Orange};

	opacity: ${props => props.$projectSelected ? 0 : 1};
	transition: 1s all;

	display: grid;

	scroll-snap-align: center;

	@media (${Design.onMobileAspectRatio}) {
		width: 100vw;
		height: 100vw;

		margin-top: 5vw;
		margin-bottom: 5vw;
	}
`

const Content = styled.div`
	background: rgba(200,200,200,0.5);
	display: grid;
	place-items: center;
`