import { useContext, useEffect, useState } from "react"
import { color, motion, useScroll, useTransform } from "framer-motion"
import { styled } from 'styled-components'

import * as Design from '../design'
import { ColorThemeContext } from "../app"

interface Props {
	container : React.RefObject<HTMLElement>
	pageCount : number
	onSelectPage : (page:number) => void
}

export const PageIndicator = (props:Props) => {
	const pages = Array.from(Array(props.pageCount))

	return	<Container>
			{
				pages.length > 1 && 
				pages.map((_, i) => {
					return <Indicator	key={i} page={i}
										container={props.container}
										onClick={() => {
											props.onSelectPage(i)
										}}/>
				})
			}
			</Container>
}

interface IndicatorProps {
	page : number
	container : React.RefObject<HTMLElement>
	onClick : () => void
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

	const size = useTransform(scrollY, range(props.page), [6, 0, 6])
	const borderWidth = useTransform(scrollY, range(props.page), [3, 4, 3])

	useEffect(() => {
		const clientHeight = props.container.current.clientHeight
		setPageHeight(clientHeight)
	}, [props.container])

	const colorTheme = useContext(ColorThemeContext)
	const style = {
		margin: 9,
		width: size,
		height: size,
		borderWidth,
		borderStyle: 'solid',
		borderColor: colorTheme.primary,
		background: 'rgba(0,0,0,0)',
		transition: '1s border-color, 0.5s background',
		cursor: 'pointer'
	}

	return <motion.div style={style} onClick={props.onClick} whileHover={{background:colorTheme.primary}}/>
}

const Container = styled.div`
	position: absolute;
	top: 0px;
	bottom: 0px;

	display: grid;
	align-content: center;
	justify-items: center;
`