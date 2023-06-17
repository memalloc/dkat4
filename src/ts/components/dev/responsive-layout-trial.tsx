import { useState } from 'react'
import styled from 'styled-components'

import { LoremIpsum } from './lorem-ipsum'

export const ResponsiveLayoutTrial = (props:any) => {

	const [showDetails, setShowDetails] = useState(true)

	return	<Container>

				<DetailToggle onClick={()=>{
					setShowDetails(!showDetails)
				}}>
					{ showDetails ? '-' : '+'}
				</DetailToggle>

				<TextScrollContainer hide={!showDetails}>
					<LoremIpsum paragraphs={5}/>
				</TextScrollContainer>

				<MediaColumn fullWidth={!showDetails}>
					<MediaContainer>
						MediaContainer
					</MediaContainer>
					<MediaContainer>
						MediaContainer
					</MediaContainer>
					<MediaContainer>
						MediaContainer
					</MediaContainer>
					<MediaContainer>
						MediaContainer
					</MediaContainer>
					<MediaContainer>
						MediaContainer
					</MediaContainer>
					<MediaContainer>
						MediaContainer
					</MediaContainer>
				</MediaColumn>

			</Container>
}

const Container = styled.div`
	user-select: none;
	font-family: ArvoRegular;
`

const DetailToggle = styled.div`
	position: fixed;
	top: 2vh;
	left: 2vw;

	background: rgb(200,0,0);
	color: white;

	border-radius: 100vw;
	width: 4vw;
	height: 4vw;

	display: grid;
	place-items: center;

	font-size: 20px;

	&:hover {
		background: rgb(255,0,0);
	}

	&:active {
		color: black;
	}
`

const TextScrollContainer = styled.div`
	background: red;

	position: fixed;
	top: 20vh;
	bottom: 2vw;;
	left: ${props => props.hide ? - '40' : '2'}vw;
	width: 30vw;

	transition: 1s all;

	overflow: scroll;
`

const MediaColumn = styled.div`
	transition: 1s all;
	margin-left: ${props => props.fullWidth ? '0' : '34'}vw;

	background: green;

	& *:nth-child(even) {
		background: #444;
	}
`

const MediaContainer = styled.div`
	height: 100vh;
	background: #555;
	color: #eee;

	display: grid;
	place-items: center;
`