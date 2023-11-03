import { motion } from 'framer-motion'

import { ArrowIcon } from './arrow-icon'

interface Props {
	details : boolean
	onClick : ()=>void
}

export const DetailToggle = (props:Props) => {

	const variants = {
		initial : {
			transformOrigin : 'center'
		},
		hidden : {
			rotate : 0,
			y: 0,
			transition : {
				delay: 0.5,
				duration : 0.5
			}
		},
		details : {
			rotate : 180,
			y : -2,
			transition : {
				delay: 0.5,
				duration : 0.5
			}
		}
	}

	return	<div>
				<motion.div onClick={props.onClick}
							variants={variants}
							initial={'details'}
							animate={props.details ? 'details' : 'hidden'}>
					<ArrowIcon/>
				</motion.div>
			</div>
}