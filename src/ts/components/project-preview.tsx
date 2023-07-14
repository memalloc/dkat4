import { forwardRef } from "react"
import styled from "styled-components"

import * as Design from '../design'

import { ProjectData } from "./project-details"

interface Props {
	project : ProjectData
	projectSelected : boolean
	onClick : ()=>void
}

export const ProjectPreview = forwardRef((props:Props, ref) => {
	return	<Project	ref={ref}
						$projectSelected={props.projectSelected}
						onClick={props.onClick}>
				{ props.project.title }
			</Project>	
	
})

const Project = styled.div<{$projectSelected:boolean,ref:any}>`
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
