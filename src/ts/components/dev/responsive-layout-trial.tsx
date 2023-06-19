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

				<MediaColumn fullWidth={!showDetails}>

					{/* mandatory elements */}

					<Title>
						Projekttitel Platzhalter
					</Title>

					<MediaContainer>
						<Video src={TestVideo} autoPlay loop mute/>
					</MediaContainer>

					<InfoBox>
						Rolle: UI Designer, Lead Developer<br/>
						Auftraggeber: Company XY
					</InfoBox>

					<ProjectDescription hide={!showDetails}>
						<LoremIpsum paragraphs={3}/>
					</ProjectDescription>

					{/* optional content elements */}

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
	right: 2vw;

	background: rgb(200,0,0);
	color: white;

	border-radius: 100vw;
	width: 4vw;
	height: 4vw;

	display: grid;
	place-items: center;

	font-size: 20px;

	z-index: 100;

	transition: 1s all;

	&:hover {
		background: rgb(255,0,0);
	}

	&:active {
		color: black;
	}

	@media (${onMobile}) {
		right: -100vw;
	}
`

const Title = styled.div`
	font-size: 30px;

	position: fixed;
	top: 2vw;
	left: 2vw;
	width: 30vw;

	background: rgba(0,0,0,0.1);

	@media (${onMobile}) {
		font-size: 30px;

		position: static;
		top: unset;
		left: unset;
	}
`

const InfoBox = styled.div`
	font-size: 20px;

	position: fixed;
	right: 2vw;
	bottom: 2vw;

	background: rgba(0,0,0,0.1);

	@media (${onMobile}) {
		font-size: 15px;

		position: static;
		top: unset;
		left: unset;
	}
`

const ProjectDescription = styled.div`
	position: fixed;
	top: 20vh;
	bottom: 2vw;;
	left: ${props => props.hide ? - '40' : '2'}vw;
	width: 30vw;

	transition: 1s all;

	overflow: scroll;

	@media (${onMobile}) {
		position: static;
		top: unset;
		left: unset;
		bottom: unset;
		width: unset;
	}
`

const MediaColumn = styled.div`
	transition: 1s all;
	margin-left: ${props => props.fullWidth ? '0' : '34'}vw;

	@media (${onMobile}) {
		margin: 0px;
	}

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

	@media (${onMobile}) {
		height: auto;
	}
`

const Video = styled.video`
	width: 100%;
	max-height: 100vh;
`

const Image = styled.img`
	max-width: 100%;
	max-height: 100vh;

	@media (${onMobile}) {
		width: 100%;
	}
`