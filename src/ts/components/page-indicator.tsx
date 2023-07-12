import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { styled } from 'styled-components'

interface Props {
	container : React.RefObject<HTMLElement>
	pageCount : number
}

export const PageIndicator = (props:Props) => {
	const pages = Array.from(Array(props.pageCount))

	return	<Container>
			{
				pages.map((_, i) => {
					return <Indicator key={i} page={i} container={props.container}/>
				})
			}
			</Container>
}

interface IndicatorProps {
	page : number
	container : React.RefObject<HTMLElement>
}

const Indicator = (props:IndicatorProps) => {

	const [pageHeight, setPageHeight] = useState(0)

	const { scrollY } = useScroll({
		container: props.container
	})

	const range = page => {
		const v = pageHeight*(props.page)
		return [v-pageHeight,v,v+pageHeight]
	}

	const scale = useTransform(scrollY, range(props.page), [1, 2, 1])

	useEffect(() => {
		const clientHeight = props.container.current.clientHeight
		setPageHeight(clientHeight)
	}, [props.container])

	const style = {
		width: 50,
		height: 50,
		borderRadius: 100,
		background: '#FF5605',
		color: '#172C32',
		display: 'grid',
		placeContent: 'center',
		scale
	}

	return <motion.div style={style}>
				{props.page+1}
			</motion.div>
}

const Container = styled.div`
	position: absolute;
	top: 0px;
	bottom: 0px;

	display: grid;
	align-content: center;
`