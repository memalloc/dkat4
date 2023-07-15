import { forwardRef, useContext, useEffect, useRef } from "react"
import styled from "styled-components"
import { useInView } from "framer-motion"

import * as Design from '../design'
import * as Helper from '../helper'

import { ProjectData } from "./project-details"
import { ColorThemeContext } from "../app"

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

	const colorTheme = useContext(ColorThemeContext)

	return	<Project	ref={ref}
						$color={colorTheme.primary}
						$projectSelected={props.projectSelected}
						onClick={props.onClick}>
				<Content ref={inViewRef}>
					{ props.project.title }
				</Content>
			</Project>	
	
})

const Project = styled.div<{$projectSelected:boolean, $color: string, ref:any}>`
	width: 60vh;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	color: #555;
	border: 2px solid ${props => props.$color};

	opacity: ${props => props.$projectSelected ? 0 : 1};
	transition: ${Helper.onSafari ? 'unset' : '1s all'};

	display: grid;

	cursor: pointer;

	scroll-snap-align: center;

	@media (${Design.onMobileAspectRatio}) {
		width: 100vw;
		height: 100vw;

		margin-top: 5vw;
		margin-bottom: 5vw;

		border: none;
	}
`

const Content = styled.div`
	background: rgba(200,200,200,0.5);
	display: grid;
	place-items: center;
`