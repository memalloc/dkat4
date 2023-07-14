import { PropsWithChildren, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { motion, useMotionValue } from "framer-motion"

import * as Design from '../design'

interface Props {
}

export const ScrollContainer = (props:PropsWithChildren<Props>) => {

	const contentRef = useRef(null)

	const thumbY = useMotionValue(0)
	const thumbHeight = useMotionValue(0)
	const thumbOpacity = useMotionValue(0)

	const updateScrollbar = () => {
		const element = contentRef.current

		const sbThumbHeight = (element.clientHeight / element.scrollHeight) * element.clientHeight
		thumbHeight.set(sbThumbHeight)

		const y = (element.scrollTop / element.scrollHeight) * (element.clientHeight)
		thumbY.set(y)

		thumbOpacity.set(element.clientHeight === element.scrollHeight ? 0 : 1)
	}

	useEffect(()=>{
		const scroll = event => {
			updateScrollbar()
		}

		const element = contentRef.current
		element.addEventListener('scroll', scroll)
		window.addEventListener('resize', scroll)

		updateScrollbar()

		return () => {
			element.removeEventListener('scroll', scroll)
			window.removeEventListener('resize', scroll)
		}
	},[contentRef])

	const scrollBarStyle = {
		y : thumbY,
		height: thumbHeight,
		opacity : thumbOpacity
	}

	return	<Container>
				<ScrollBarContainer onClick={(event)=>{
					const div = event.target as HTMLDivElement
					const bounds = div.getBoundingClientRect()
					const y = event.clientY - bounds.top
					const factor = y / bounds.height

					const content = contentRef.current as HTMLDivElement
					content.scrollTop = content.scrollHeight * factor - content.clientHeight/2
				}}>
					<ScrollBar style={scrollBarStyle}/>
				</ScrollBarContainer>
				<ScrollContent ref={contentRef}>
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

	@media (${Design.onMobile}) {
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

	@media (${Design.onMobile}) {
		opacity: 0;
	}
`

const ScrollBar = styled(motion.div)`
	background: ${Design.Colors.Orange};
	width: 4px;
`

const ScrollContent = styled.div`

	justify-self: stretch;

	border-top: 2px solid ${Design.Colors.Orange};
	border-bottom: 2px solid ${Design.Colors.Orange};

	overflow: scroll;
	scroll-behavior: smooth;

	&::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;

	@media (${Design.onMobile}) {
		border: none;
	}
`