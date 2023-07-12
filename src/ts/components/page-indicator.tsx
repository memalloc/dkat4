import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Props {
	container : React.RefObject<HTMLElement>
}

export const PageIndicator = (props:Props) => {
	return	<div>
				PageIndicator
				<Indicator page={0} container={props.container}/>
				<Indicator page={1} container={props.container}/>
				<Indicator page={2} container={props.container}/>
				<Indicator page={3} container={props.container}/>
			</div>
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
		x : '35vw',
		y : `${35 + 20 * (props.page/4)}vh`,
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