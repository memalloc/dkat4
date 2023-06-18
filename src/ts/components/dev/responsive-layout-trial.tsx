import { useState } from 'react'
import styled from 'styled-components'

import { LoremIpsum } from './lorem-ipsum'

import TestVideo from '../../../assets/video/test.mp4'

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
						<video src={TestVideo} autoPlay loop mute width='100%'/>
					</MediaContainer>
					<MediaContainer>
						<Image src='https://placehold.co/800x800'/>
					</MediaContainer>
					<MediaContainer>
						<Image src='https://placehold.co/1920x1080'/>
					</MediaContainer>
					<MediaContainer>
						<Image src='https://placehold.co/90x160'/>
					</MediaContainer>
				</MediaColumn>

			</Container>
}

const onMobile = 'max-width: 425px'

const Container = styled.div`
	user-select: none;
	font-family: ArvoRegular;
	background: #aaa;
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

	transition: 1s all;

	&:hover {
		background: rgb(255,0,0);
	}

	&:active {
		color: black;
	}

	@media (${onMobile}) {
		left: -100vw;
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

	@media (${onMobile}) {
		left: -500vw;
	}
`

const MediaColumn = styled.div`
	transition: 1s all;
	margin-left: ${props => props.fullWidth ? '0' : '34'}vw;

	@media (${onMobile}) {
		margin: 0px;
	}

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
	align-items: stretch;

	pointer-events: none;
`

const Image = styled.img`
	max-width: 100%;
`