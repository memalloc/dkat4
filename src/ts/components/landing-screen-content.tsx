import { useContext } from 'react'
import styled from 'styled-components'

import { ColorThemeContext } from '../app'
import { MultilinePrompt, PromptLine, TypedPrompt } from './typed-prompt'
import { ArrowIcon } from './arrow-icon'
import { motion } from 'framer-motion'

interface Props {
	onScrollToProjects : ()=>void	
	hideProjectsHint : boolean
}

export const LandingScreenContent = (props:Props) => {

	const colorTheme = useContext(ColorThemeContext)

	const promptContent:Array<PromptLine> = [
		["daniel kauer"],
		["designs & develops"],
		{
			line : [' ',
				{
					text : "pinboard",
					href : 'https://pinboard.in/u:memalloc'
				},
				{
					text : "github",
					href : 'https://github.com/memalloc'
				},
				' ',
				{
					text : "vimeo",
					href : 'https://vimeo.com/memalloc'
				}
			],
			small : true
		},
		{
			line : [ "say ",
				{
					text : "> hello",
					href : 'mailto:hello@danielkauer.at'
				}
			],
			italic : true
		}
	]

	const hintDelay = 8

	return	<>
				<MainText $color={colorTheme.primary}>
					<MultilinePrompt lines={promptContent} onTyped={()=>{
							console.log('done')
					}}/>
				</MainText>

				<ProjectsHint	$color={colorTheme.primary}
								initial={{y:200, opacity: 0}}
								animate={{y : [200, 0], opacity : [0, 1]}}
								transition={{delay:hintDelay}}
								>
					<motion.div animate={{opacity : props.hideProjectsHint ? 0 : 1}}
								transition={{duration:1}}>
						<ProjectsHintContent	animate={{y:[0,10,0,10,0], x:12}}
												initial={{x:12}}
												transition={{repeat: Infinity, repeatDelay: 3}}
												onClick={()=>{
													props.onScrollToProjects()
												}}>
							<ArrowContainer>
								<ArrowIcon/>
							</ArrowContainer>
							<MultilinePrompt delay={hintDelay} hideCursorWhenFinished
											 lines={[{line:["selected projects"], small : true}]}/>
						</ProjectsHintContent>
					</motion.div>
				</ProjectsHint>
			</>
}

const MainText = styled.div<{$color:string}>`
	color: ${props => props.$color};

	text-align: right;

	position: absolute;
	right: 3vw;
	top: 0vh;
	bottom: 0vh;

	display: grid;
	align-content: center;
	font-family: ArvoRegular;

	transition: 1s color;
`

const ProjectsHint = styled(motion.div)<{$color:string}>`
	position: absolute;
	bottom: 20px;
	left: 0vw;
	right: 0vw;

	font-family: ArvoRegular;
	color: ${props => props.$color};

	display: grid;
	place-content: center;
`

const ProjectsHintContent = styled(motion.div)`
	display: grid;
	justify-items: start;
	justify-content: center;
	align-items: center;

	grid-template-columns: 56px 170px;
	grid-gap: 10px;

	width: 300px;

	cursor: pointer;

	font-family: ArvoBold;
	letter-spacing: 0.5px;
`

const ArrowContainer = styled.div`
	transform: rotate(-90deg) translateX(2px);
`
