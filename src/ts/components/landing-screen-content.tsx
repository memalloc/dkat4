import { useContext } from 'react'
import styled from 'styled-components'
import { ColorThemeContext } from '../app'

interface Props {
	onScrollToProjects : ()=>void	
}

export const LandingScreenContent = (props:Props) => {

	const colorTheme = useContext(ColorThemeContext)

	return	<>
				<MainText $color={colorTheme.primary}>
					<Line>
						daniel kauer
					</Line>
					<Line>
						designs &amp; develops
					</Line>
					<Line>
						pinboard twitter vimeo
					</Line>
					<Line>
						say &gt;hello
					</Line>
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

const Line = styled.div`
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
