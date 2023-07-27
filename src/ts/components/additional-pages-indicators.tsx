import { useEffect, useState } from "react"
import styled from "styled-components"

import * as Design from '../design'

import { ArrowIcon } from "./arrow-icon"
import { motion } from "framer-motion"
import { DescriptionWidth } from "./project-details"

type IndicatedPage = 'next' | 'previous'

interface Props {
	container : React.RefObject<HTMLElement>
	details : boolean
	onMoveToPage : (page:IndicatedPage) => void
}

export const AdditionalPagesIndicators = (props:Props) => {

	const [hasNextPage, setHasNextPage] = useState<undefined|boolean>(undefined)
	const [hasPreviousPage, setHasPreviousPage] = useState<undefined|boolean>(undefined)

	useEffect(()=>{

		const updatePageState = () => {
			const element = props.container.current
			if(element){
				const prev = element.scrollTop > element.clientHeight/2
				const next = element.scrollTop < element.scrollHeight - element.clientHeight * 1.5

				setHasPreviousPage(prev)
				setHasNextPage(next)
			}
		}

		const scroll = event => {
			updatePageState()
		}

		const element = props.container.current
		element.addEventListener('scroll', scroll)
		window.addEventListener('resize', scroll)

		updatePageState()

		return () => {
			element.removeEventListener('scroll', scroll)
			window.removeEventListener('resize', scroll)
		}
	}, [props.container])

	return	<>	
				<ArrowIndicator page="previous"
								visible={hasPreviousPage === true}
								details={props.details}
								onClick={()=>{
									props.onMoveToPage('previous')
								}}/>
				<ArrowIndicator page="next"
								visible={hasNextPage === true}
								details={props.details}
								onClick={()=>{
									props.onMoveToPage('next')
								}}/>
			</>
}

interface ArrowIndicatorProps {
	page : IndicatedPage
	visible : boolean
	details : boolean
	onClick : () => void
}

const ArrowIndicator = (props:ArrowIndicatorProps) => {

	const direction = props.page === 'previous' ? 1 : -1
	const rotate = 90 * direction
	const y = props.visible ? 0 : 100 * -direction

	return	<Position	$page={props.page}
						$visible={props.visible}
						$details={props.details}
						onClick={props.onClick}>
				<motion.div initial={{rotate, y, x : -(56*0.65)/2, scale: 0.7}}
							animate={{rotate, y}}>
					<ArrowIcon/>
				</motion.div>
			</Position>

}

const Position = styled.div<{$page:IndicatedPage, $visible:boolean, $details:boolean}>`
		position: fixed;
		top: ${props => props.$page === 'previous' ? '0.5vh' : 'unset'};
		bottom: ${props => props.$page === 'previous' ? 'unset' : '0.5vh'};

		left: ${props => props.$details ? DescriptionWidth : '34px'};
		width: 56px;
		height: 56px;

		transition: 1s all;

	${Design.MobileMediaQuery} {
		display: none;
	}
`