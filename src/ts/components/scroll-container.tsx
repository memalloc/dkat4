import { PropsWithChildren, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { motion, useMotionValue } from "framer-motion"

interface Props {
}

export const ScrollContainer = (props:PropsWithChildren<Props>) => {

	const contentRef = useRef(null)

	const thumbY = useMotionValue(0)
	const thumbHeight = useMotionValue(0)

	const updateScrollbar = () => {
		const element = contentRef.current

		const sbThumbHeight = (element.clientHeight / element.scrollHeight) * element.clientHeight
		thumbHeight.set(sbThumbHeight)

		const y = (element.scrollTop / element.scrollHeight) * (element.clientHeight)
		thumbY.set(y)
	}

	useEffect(()=>{
		const scroll = event => {
			updateScrollbar()
		}

		const element = contentRef.current
		element.addEventListener('scroll', scroll)

		updateScrollbar()

		return () => {
			element.removeEventListener('scroll', scroll)
		}
	},[contentRef])

	const scrollBarStyle = {
		y : thumbY,
		height: thumbHeight
	}

	return	<Container>
				<ScrollBar style={scrollBarStyle}/>
				<ScrollContent ref={contentRef}>
					{props.children}
				</ScrollContent>
			</Container>
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 8vw auto;
	justify-items: center;	

	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
`

const ScrollBar = styled(motion.div)`
	background: orange;
	width: 1vw;
`

const ScrollContent = styled.div`

	overflow: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
`