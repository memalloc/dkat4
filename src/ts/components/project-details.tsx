import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from '../design'

import { ScrollContainer } from "./scroll-container"

import TestVideo from '../../assets/video/test.mp4'
import { LoremIpsum } from './dev/lorem-ipsum'
import { PageIndicator } from './page-indicator'

interface Props {
}

export const ProjectDetails = (props:Props) => {
	const [showDetails, setShowDetails] = useState(true)
	
	const mediaColumnRef = useRef(null)

	return	<Container>

				<BackgroundPlaceholder/>

				<MediaColumn fullWidth={!showDetails} ref={mediaColumnRef}>

					{/* mandatory elements */}

					<Title>Verkehrsmuseum Remise</Title>

					<MediaContainer>
						<Video src={TestVideo} autoPlay loop muted playsInline/>
					</MediaContainer>

					<InfoBox details={showDetails}>
						Work: Design &amp; Development<br />
						Client: Wiener Linien<br />
						Agency: Zone Media
					</InfoBox>

					<ProjectDescription details={showDetails}>
						<ScrollContainer>
							<LoremIpsum paragraphs={3}/>
						</ScrollContainer>
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

				<ToggleContainer details={showDetails}>
					<DetailToggle details={showDetails} onClick={()=>{
						setShowDetails(!showDetails)
					}}>
						{ showDetails ? '<' : '>'}
					</DetailToggle>
				</ToggleContainer>

				<PageIndicator container={mediaColumnRef}/>

			</Container>
}

const Container = styled.div`
	font-family: ArvoRegular;
	color: #FF5605;
`

const BackgroundPlaceholder = styled.div`
	background: #172C32;
	position: fixed;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
`

const Title = styled.div`
	font-size: 30px;

	position: fixed;
	top: 0vh;
	height: 20vh;
	left: 2vw;
	width: 30vw;

	display: grid;
    align-items: end;

	transition: 1s all;

	@media (${Design.onMobile}) {
		font-size: 30px;

		position: static;
		top: unset;
		left: unset;
		height: unset;
	}
`

const ProjectDescription = styled.div<{details:boolean}>`
	position: fixed;
	top: 20vh;
	bottom: 20vh;;
	left: ${props => !props.details ? '-40' : '2'}vw;
	width: 30vw;

	border-top: 3px solid #FF5605;
	border-bottom: 3px solid #FF5605;

	transition: 1s all;

	@media (${Design.onMobile}) {
		position: static;
		top: unset;
		left: unset;
		bottom: unset;
		width: unset;

		border: none;
	}
`

const InfoBox = styled.div<{details:boolean}>`
	font-size: 20px;

	position: fixed;
	left: ${props => props.details ? 2 : 9}vw;
	bottom: 0vw;
	height: 20vh;

	transition: 1s all;

	@media (${Design.onMobile}) {
		font-size: 15px;

		position: static;
		top: unset;
		left: unset;
		height: unset;
	}
`
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - temp
const ToggleContainer = styled.div<{details:boolean}>`
	position: fixed;
	bottom: 0vw;
	height: 20vh;

	left: 2vw;
	width: ${props => props.details ? 30 : 2}vw;

	display: grid;
	justify-items: end;

	transition: 1s all;

	@media (${Design.onMobile}) {
		left: -100vw;
	}
`

const DetailToggle = styled.div<{details:boolean}>`
	background: #FF5605;
	color: white;

	border-radius: 100vw;
	width: 4vw;
	height: 4vw;

	display: grid;
	place-items: center;

	font-size: 20px;

	z-index: 100;

	user-select: none;

	transition: 1s all;


	&:hover {
		background: rgb(255,0,0);
	}

	&:active {
		color: black;
	}

	@media (${Design.onMobile}) {
		right: -100vw;
	}
`

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const MediaColumn = styled.div<{fullWidth : boolean}>`
	transition: 1s all;

	padding-left: ${props => props.fullWidth ? '0' : '34'}vw;

	position: fixed;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;

	overflow: scroll;

	scroll-snap-type: y mandatory;

	@media (${Design.onMobile}) {
		padding: 0px;
		scroll-snap-type: none;
	}

	& *:nth-child(even) {
		// background: #444;
	}
`

const MediaContainer = styled.div`
	height: 100vh;

	scroll-snap-align: center;
	
	display: grid;
	align-items: stretch;
	justify-items: stretch;

	pointer-events: none;

	@media (${Design.onMobile}) {
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

	@media (${Design.onMobile}) {
		width: 100%;
	}
`