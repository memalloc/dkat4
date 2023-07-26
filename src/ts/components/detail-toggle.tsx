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

	return	<div>
				<motion.div onClick={props.onClick}
							variants={variants}
							animate={props.details ? 'details' : 'hidden'}>
					<ArrowIcon/>
				</motion.div>
			</div>
}