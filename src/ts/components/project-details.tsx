import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from '../design'

import { ScrollContainer } from "./scroll-container"

import TestVideo from '../../assets/video/test.mp4'
import { LoremIpsum } from './dev/lorem-ipsum'
import { PageIndicator } from './page-indicator'
import { DetailToggle } from './detail-toggle'

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
					}}/>
				</ToggleContainer>

				<PageIndicatorContainer details={showDetails}>
					<PageIndicator container={mediaColumnRef} pageCount={4}/>
				</PageIndicatorContainer>

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
	height: 16.5vh;
	left: 3vw;
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
	font-size: 15px;
	line-height: 32.75px;
	letter-spacing: 0.5px;

	position: fixed;
	top: 17.5vh;
	bottom: 17.5vh;
	left: ${props => !props.details ? '-40' : '0'}vw;
	width: 30vw;

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
	font-size: 15px;
	line-height: 24px;
	letter-spacing: 0.5px;

	position: fixed;
	left: ${props => props.details ? 3 : 7}vw;
	bottom: 0vw;
	height: 16.5vh;

	transition: 1s all;

	@media (${Design.onMobile}) {
		font-size: 15px;

		position: static;
		top: unset;
		left: unset;
		height: unset;
	}
`

const PageIndicatorContainer = styled.div<{details:boolean}>`
	background: green;
	position: fixed;
	bottom: 20vh;
	top: 20vh;

	left: ${props => props.details ? 31 : 2}vw;

	transition: 1s all;

	@media (${Design.onMobile}) {
		display: none;
	}
`

const ToggleContainer = styled.div<{details:boolean}>`
	position: fixed;
	bottom: 0vw;
	height: 15.5vh;

	left: 2vw;
	width: ${props => props.details ? 31 : 2}vw;

	display: grid;
	justify-items: end;

	transition: 1s all;

	@media (${Design.onMobile}) {
		left: -100vw;
	}
`

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