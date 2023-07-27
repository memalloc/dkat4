import { forwardRef, useContext, useEffect, useRef, useState } from "react"
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
						$projectSelected={props.projectSelected}>
				<Content ref={inViewRef} $inView={isInView} $color={colorTheme.primary}
						$hoverColor={colorTheme.background} onClick={props.onClick}>
					<ProjectImage src={props.project.image} inView={isInView}/>
				</Content>
			</Project>	
	
})

const ProjectImage = (props:{src:string, inView:boolean}) => {

	const [aspectRatio, setAspectRatio] = useState(1)

	const colorTheme = useContext(ColorThemeContext)

	return <Image	src={props.src}
					$aspectRatio={aspectRatio}
					$color={colorTheme.primary}
					$hoverColor={colorTheme.background}
					$inView={props.inView}
					onLoad={(e)=>{
						const image = e.target as HTMLImageElement
						setAspectRatio(image.naturalWidth/image.naturalHeight)
					}}/>
}

const Project = styled.div<{$projectSelected:boolean, ref:any}>`
	width: 100vw;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	color: #555;

	opacity: ${props => props.$projectSelected ? 0 : 1};
	transition: ${Helper.onSafari ? 'unset' : '1s all'};

	display: grid;
	place-items: center;

	scroll-snap-align: center;

	@media (${Design.onMobileAspectRatio}) {
		width: 100vw;
		height: unset;

		margin-top: 5vw;
		margin-bottom: 5vw;
	}
`

const Content = styled.div<{$inView, $color, $hoverColor}>`
	height: 60vh;
	min-width: 60vh;
	border: 2px solid ${props => props.$color};


	&:hover {
		border-color: ${props => props.$hoverColor}
	}

	opacity: ${props => props.$inView ? '1' : '0.5'};

	transition: 1s all;

	display: grid;
	place-items: center;

	cursor: pointer;

	@media (${Design.onMobileAspectRatio}) {
		width: 100vw;
		min-width: unset;
		height: unset;
		opacity: 1;
		border: none;
	}
`

const Image = styled.img<{$inView, $aspectRatio}>`
	object-fit: cover;

	height: 60vh;
	width: ${props => props.$inView ? props.$aspectRatio * 60 : 60}vh;
	max-width: 95vw;

	opacity: ${props => props.$inView ? 1 : 0};
	transition: 1s all;

	@media (${Design.onMobileAspectRatio}) {
		width: 100vw;
		max-width: 100vw;
		height: auto;

		opacity: 1;

		object-fit: contain;
	}

`