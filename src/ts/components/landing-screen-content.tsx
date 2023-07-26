import { useContext } from 'react'
import styled from 'styled-components'

import { ColorThemeContext } from '../app'
import { MultilinePrompt, PromptLine, TypedPrompt } from './typed-prompt'
import { ArrowIcon } from './arrow-icon'
import { motion } from 'framer-motion'

interface Props {
	onScrollToProjects : ()=>void	
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
					text : "twitter",
					href : 'https://twitter.com/memalloc'
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
								initial={{y:200}}
								animate={{y : [200, 0], x : 12}}
								transition={{delay:hintDelay}}
								>
					<ProjectsHintContent	animate={{y:[0,10,0,10,0]}}
											transition={{repeat: Infinity, repeatDelay: 3}}
											onClick={()=>{
												props.onScrollToProjects()
											}}>
						<ArrowContainer>
							<ArrowIcon/>
						</ArrowContainer>
						<MultilinePrompt delay={hintDelay} lines={[{line:["selected projects"], small : true}]}/>
					</ProjectsHintContent>
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
`

const ArrowContainer = styled.div`
	transform: rotate(-90deg) translateX(2px);
`
