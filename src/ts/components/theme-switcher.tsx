import { useState } from 'react'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'

import * as Design from '../design'

interface Props {
	onThemeChange : (theme:Design.ColorTheme) => void
	hidden? : boolean
}

const wrappedIndex = (arr: any[], index: number, offset: number): number => {
	const wrappedIndex = (index + offset) % arr.length;
 	// Handle negative indices (wrapping from the beginning of the array)
	const finalIndex = wrappedIndex < 0 ? arr.length + wrappedIndex : wrappedIndex;
	return finalIndex
}

const calculateClosestDistance = (arrLength: number, index1: number, index2: number): number => {
  const distanceClockwise = index2 >= index1 ? index2 - index1 : arrLength - index1 + index2
  const distanceCounterClockwise = index1 >= index2 ? index1 - index2 : arrLength - index2 + index1

  return distanceClockwise <= distanceCounterClockwise ? distanceClockwise : -distanceCounterClockwise
}

const THEME_DISTANCE = 30
const INTERACTION_AREA_SIZE = 40
const THEME_SIZE = 10

export const ThemeSwitcher = (props:Props) => {

	const [themeIndex, setThemeIndex] = useState(0)

	const smaller = 0.7

	const hidePosition = Design.onMobile() ? '50vw' : '-20vw'

	return	<Container 	initial={{opacity : 0}}
											animate={{x : props.hidden ? hidePosition : '0vw', opacity : 1}}
											transition={{duration:1, opacity : { delay : 7 }}}>
			{

				Design.Themes.map((theme, index)=>{
					const relativeIndex = calculateClosestDistance(Design.Themes.length, themeIndex, index)
					const visible = Math.abs(relativeIndex) < 2

					const containerAnimation = {
						x : THEME_DISTANCE * Math.min(Math.max(-2,relativeIndex), 2),
						opacity : visible ? 1 : 0,
						cursor : visible && index !== themeIndex ? 'pointer' : undefined
					}

					const themeAnimation = {
						scale : relativeIndex === 0 ? 1 : smaller,
						background: theme.background,
						borderColor : theme.primary
					}

					const transition = {
						duration : 0.5
					}

					return <ThemeInteractionArea	key={index}
									animate={containerAnimation}
									transition={transition}
									onClick={() => {
										if(visible){
											setThemeIndex(wrappedIndex(Design.Themes, themeIndex, relativeIndex))
											props.onThemeChange(theme)
										}
									}}>
										<Theme animate={themeAnimation} transition={transition}/>
									</ThemeInteractionArea>
				})
			}
			</Container>
}

const Container = styled(motion.div)`
	position: fixed;
	bottom: ${INTERACTION_AREA_SIZE + THEME_SIZE}px;
	left: calc(3vw + ${THEME_DISTANCE}px - ${INTERACTION_AREA_SIZE/2}px + ${THEME_SIZE/2}px);

	${Design.MobileMediaQuery} {
		top: 10px;
		right: ${INTERACTION_AREA_SIZE*2}px;
		bottom: unset;
		left: unset;
	}
`

const ThemeInteractionArea = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: ${INTERACTION_AREA_SIZE}px;
	height: ${INTERACTION_AREA_SIZE}px;
	display: grid;
	place-items: center;
`

const Theme = styled(motion.div)`
	border: 3px solid ;

	width: ${THEME_SIZE}px;
	height: ${THEME_SIZE}px;

	border-radius: ${THEME_SIZE}px;
`