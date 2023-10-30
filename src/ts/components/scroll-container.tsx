import { PropsWithChildren, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { motion, useMotionValue } from "framer-motion"

import * as Design from '../design'
import { ColorThemeContext } from '../app'

interface Props {
}

export const ScrollContainer = (props:PropsWithChildren<Props>) => {

	const contentRef = useRef(null)
	const [mouseDown, setMouseDown] = useState(false)

	const thumbY = useMotionValue(0)
	const thumbHeight = useMotionValue(0)
	const thumbOpacity = useMotionValue(0)

	const colorTheme = useContext(ColorThemeContext)

	const updateScrollbar = () => {
		const element = contentRef.current
		if(element !== null){
			const sbThumbHeight = (element.clientHeight / element.scrollHeight) * element.clientHeight
			thumbHeight.set(sbThumbHeight)

			const y = (element.scrollTop / element.scrollHeight) * (element.clientHeight)
			thumbY.set(y)

			thumbOpacity.set(element.clientHeight === element.scrollHeight ? 0 : 1)
		}
	}

	useEffect(()=>{
		const scroll = event => {
			updateScrollbar()
		}

		let resizeTimeout
		const resize = event => {
			// delay update for one second to allow the CSS transition to finish
			clearTimeout(resizeTimeout)
			resizeTimeout = setTimeout(()=>{
				updateScrollbar()
			}, 1000)
		}

		const element = contentRef.current
		element.addEventListener('scroll', scroll)

		window.addEventListener('resize', resize)

		updateScrollbar()

		return () => {
			element.removeEventListener('scroll', scroll)
			window.removeEventListener('resize', scroll)
			clearTimeout(resizeTimeout)
		}
	},[contentRef])

	const scrollBarStyle = {
		y : thumbY,
		height: thumbHeight,
		opacity : thumbOpacity
	}

	const scrollToMousePosition = (event:React.MouseEvent) => {
		const div = event.target as HTMLDivElement
		const bounds = div.getBoundingClientRect()
		const y = event.clientY - bounds.top
		const factor = y / bounds.height

		const content = contentRef.current as HTMLDivElement
		if(content !== null){
			content.scrollTop = content.scrollHeight * factor - content.clientHeight/2
		}
	}

	return	<Container>
				<ScrollBarContainer onClick={(event)=>{
					scrollToMousePosition(event)
				}} onMouseMove={(event)=>{
					if(mouseDown){
						scrollToMousePosition(event)
					}
				}}
				onMouseDown={_ => setMouseDown(true)}
				onMouseUp={_ => setMouseDown(false)}
				onMouseLeave={_ => setMouseDown(false)}
				onMouseOut={_ => setMouseDown(false)}>
					<ScrollBar style={scrollBarStyle} $color={colorTheme.primary}/>
				</ScrollBarContainer>
				<ScrollContent ref={contentRef} $smoothScroll={!mouseDown} $color={colorTheme.primary}>
					{props.children}
				</ScrollContent>
			</Container>
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 3vw auto;
	justify-items: center;	

	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;

	overflow: hidden;

	${Design.MobileMediaQuery} {
		grid-template-columns: 0vw auto;

		position: static;
		top: unset;
		left: unset;
		right: unset;
		bottom: unset;
	}
`

const ScrollBarContainer = styled.div`
	width: 3vw;

	display: grid;
	justify-items: center;
	
	cursor: pointer;

	${Design.MobileMediaQuery} {
		opacity: 0;
	}
`

const ScrollBar = styled(motion.div)<{$color:string}>`
	width: 4px;
	pointer-events: none;

	background: ${props => props.$color};
	transition: 1s background;
`

const ScrollContent = styled.div<{$smoothScroll:boolean, $color:string}>`

	justify-self: stretch;

	border-top: 2px solid ${props => props.$color};
	border-bottom: 2px solid ${props => props.$color};
	transition: 1s border-color;

	padding-right: 20px;

	overflow: scroll;
	scroll-behavior: ${props => props.$smoothScroll ? 'smooth' : 'auto'};

	&::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;

	${Design.MobileMediaQuery} {
		border: none;
		padding: 0px;
	}
`