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

export const ThemeSwitcher = (props:Props) => {

	const [themeIndex, setThemeIndex] = useState(0)

	const distance = 30
	const smaller = 0.7

	const variants = {
		prevHidden : {
			x : -distance * 2,
			scale : smaller,
			opacity : 0
		},
		prev : {
			x : -distance,
			scale : smaller,
			opacity: 1
		},
		current : {
			x : 0,
			scale : 1
		},
		next : {
			x : distance,
			scale : smaller,
			opacity: 1
		},
		nextHidden : {
			x : distance * 2,
			opacity : 0
		},
		otherHidden : {
			opacity : 0
		}
	}
	
	return	<Container animate={{y : props.hidden ? 200 : 0}}>
			{

				Design.Themes.map((theme, index)=>{
					const relativeIndex = calculateClosestDistance(Design.Themes.length, themeIndex, index)
					const visible = Math.abs(relativeIndex) < 2

					const animate = {
						x : distance * Math.min(Math.max(-2,relativeIndex), 2),
						opacity : visible ? 1 : 0,
						scale : relativeIndex === 0 ? 1 : smaller,
						background: theme.background,
						borderColor : theme.primary,
						cursor : visible ? 'pointer' : undefined
					}

					const transition = {
						duration : 0.5
					}

					return <Theme	key={index}
									animate={animate}
									transition={transition}
									onClick={() => {
										if(visible){
											setThemeIndex(wrappedIndex(Design.Themes, themeIndex, relativeIndex))
											props.onThemeChange(theme)
										}
									}}/>
					return <div></div>	
				})
			}
			</Container>
}

const Container = styled(motion.div)`
	position: fixed;
	bottom: 45px;
	left: 72px;
`

const size = '10px'

const Theme = styled(motion.div)`
	border: 3px solid ;

	width: ${size};
	height: ${size};

	border-radius: ${size};
	margin-right: 8px;

	position: absolute;
	top: 0px;
	left: 0px;
`