import { useContext } from 'react'
import styled from 'styled-components'

import { ColorThemeContext } from '../app'
import { MultilinePrompt, Line, TypedPrompt } from './typed-prompt'

interface Props {
	onScrollToProjects : ()=>void	
}

export const LandingScreenContent = (props:Props) => {

	const colorTheme = useContext(ColorThemeContext)

	const promptContent:Array<Line> = [
		["daniel kauer"],
		["designs & develops"],
		[' ',
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
		[ "say ",
			{
				text : "> hello",
				href : 'mailto:hello@danielkauer.at'
			}
		]
	]

	return	<>
				<MainText $color={colorTheme.primary}>
					<MultilinePrompt lines={promptContent} onTyped={()=>{
							console.log('done')
					}}/>
				</MainText>

				<Button onClick={()=>{
					props.onScrollToProjects()
				}}>
					scroll to projects
				</Button>
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

// - - - - - - - - - - - - - - - - - - - - - - - - temp

const Button = styled.div`
	position: absolute;
	bottom: 10vh;
	left: 10vh;

    font-family: ArvoBold;

	color: #555;
	background: #bbb;
	padding: 15px;

	display: inline;

	&:hover {
		background: #ddd;	
		color: #333;	
	}
`
