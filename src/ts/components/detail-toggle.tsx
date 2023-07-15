import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import * as Design from '../design'
import { useContext, useState } from 'react'
import { ColorThemeContext } from '../app'

interface Props {
	details : boolean
	onClick : ()=>void
}

export const DetailToggle = (props:Props) => {

	const [hover, setHover] = useState(false)

	const variants = {
		initial : {
			transformOrigin : 'center'
		},
		details : {
			rotate : 0,
			y: 0,
			transition : {
				delay: 0.5,
				duration : 0.5
			}
		},
		hidden : {
			rotate : 180,
			y : -2,
			transition : {
				delay: 0.5,
				duration : 0.5
			}
		}
	}

	const colorTheme = useContext(ColorThemeContext)

	return	<Container onMouseEnter={() => setHover(true)}
						onMouseOver={() => setHover(true)}
						onMouseOut={() => setHover(false)}
						onMouseLeave={()=> setHover(false)}>
				<motion.div onClick={props.onClick}
							variants={variants}
							animate={props.details ? 'details' : 'hidden'}>
					<Icon color={colorTheme.primary} hover={hover}/>
				</motion.div>
			</Container>
}

const Container = styled.div`
	width: 56px;
	height: 56px;

	cursor: pointer;
`

const Icon = (props:{color:string, hover:boolean}) => {
	return <svg width="56px" height="56px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<g id="detail-toggle" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
        			<path d="M27.7071068,9.10050506 L27.8042237,21.9995051 L43,22 L43,35 L27.9032237,34.9995051 L28,47.6066017 L17.8076118,37.3847763 L8.61522369,28.1923882 L27.7071068,9.10050506 Z" id="Combined-Shape" fill={props.hover ? props.color : 'none'}></path>
					<path d="M28,1 C42.9116882,1 55,13.0883118 55,28 C55,42.9116882 42.9116882,55 28,55 C13.0883118,55 1,42.9116882 1,28 C1,13.0883118 13.0883118,1 28,1 Z M27.7071068,9.10050506 L8.61522369,28.1923882 L17.8076118,37.3847763 L28,47.6066017 L27.9032237,34.9995051 L43,35 L43,22 L27.8042237,21.9995051 L27.7071068,9.10050506 Z" id="Combined-Shape" fill={!props.hover ? props.color : 'none'} stroke={props.hover ? props.color : 'none'}></path>
				</g>
			</svg>
}
