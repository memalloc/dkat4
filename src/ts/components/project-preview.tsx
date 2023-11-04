import { PropsWithChildren, forwardRef, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"

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
				<UserPressScaler>
					<Content ref={inViewRef}
							 $inView={isInView && !props.projectSelected}
							 $color={colorTheme.primary}
							 onClick={props.onClick}>
						<ProjectImage src={props.project.image} alt={props.project.title} inView={isInView && !props.projectSelected}/>
					</Content>
				</UserPressScaler>
			</Project>	
	
})

const UserPressScaler = (props:PropsWithChildren<{}>) => {
	const [pressed, setPressed] = useState(false)

	return	<motion.div animate={{scale : pressed ? 0.95 : 1}}
						onMouseDown={()=>{setPressed(true)}}
						onMouseUp={()=>{setPressed(false)}}
						onMouseLeave={()=>{setPressed(false)}}
						onMouseOut={()=>{setPressed(false)}}
						onTouchStart={()=>{setPressed(true)}}
						onTouchEnd={()=>{setPressed(false)}}
						onTouchCancel={()=>{setPressed(false)}}>
				{ props.children }
			</motion.div>
}

const ProjectImage = (props:{src:string, alt:string, inView:boolean}) => {

	const [aspectRatio, setAspectRatio] = useState(1)

	return <Image	src={props.src}
					alt={props.alt}
					$aspectRatio={aspectRatio}
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

const Content = styled.div<{$inView, $color}>`
	height: 60vh;
	min-width: 60vh;
	border: 2px solid ${props => props.$color};

	&:hover {
		transform: scale(1.025);
	}

	opacity: ${props => props.$inView ? '1' : '0.5'};

	transform: scale(1);
	transition: 1s all;

	display: grid;
	place-items: center;

	cursor: pointer;

	@media (${Design.onMobileAspectRatio}) {
		width: 80vw;
		min-width: unset;
		height: unset;
		opacity: 1;
	}
`

const Image = styled.img<{$inView, $aspectRatio}>`
	object-fit: cover;

	height: 60vh;
	width: ${props => props.$inView ? props.$aspectRatio * 60 : 60}vh;
	max-width: 95vw;

	opacity: ${props => props.$inView ? 1 : 0};
	transition: 1s all;
	
	pointer-events: none;

	@media (${Design.onMobileAspectRatio}) {
		max-width: 80vw;
		height: auto;

		opacity: ${props => props.$inView ? 1 : 0.25};

		object-fit: contain;
	}
`