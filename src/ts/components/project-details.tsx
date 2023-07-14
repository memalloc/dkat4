import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'

import * as Design from '../design'

import { ScrollContainer } from "./scroll-container"

import { Markdown } from './markdown'

import { PageIndicator } from './page-indicator'
import { DetailToggle } from './detail-toggle'
import { MediaContent } from './media-content'

export interface ProjectData {
	id : string
	title : string
	info : string
	description : string
	media : Array<string>
}

interface Props {
	project : ProjectData
}

export const ProjectDetails = (props:Props) => {
	const [showDetails, setShowDetails] = useState(true)
	
	const mediaColumnRef = useRef(null)

	const media = [...props.project.media]
	const initialMedia = media.shift()

	return	<Container>

				<MediaColumn $fullWidth={!showDetails} ref={mediaColumnRef}>

					<Title $shadow={!showDetails}>
						<CloseHeader href="javascript:history.back()" $details={showDetails}>
							Selected Projects
						</CloseHeader>
						<Markdown disableParagraphMargin>
							{ props.project.title }
						</Markdown>
					</Title>

					<MediaContainer>
						<MediaContent url={initialMedia}/>
					</MediaContainer>

					<InfoBox $details={showDetails} $shadow={!showDetails}>
						<Markdown>
							{ props.project.info }
						</Markdown>
					</InfoBox>

					<ProjectDescription $details={showDetails}>
						<ScrollContainer>
							<Markdown disableParagraphMargin>
								{ props.project.description }
							</Markdown>
						</ScrollContainer>
					</ProjectDescription>

					{
						media.map((url, i)=>{
							return	<MediaContainer key={i}>
										<MediaContent url={url}/>
									</MediaContainer>
						})
					}

				</MediaColumn>

				<ToggleContainer $details={showDetails}>
					<DetailToggle details={showDetails} onClick={()=>{
						setShowDetails(!showDetails)
					}}/>
				</ToggleContainer>

				<PageIndicatorContainer $details={showDetails}>
					<PageIndicator container={mediaColumnRef} pageCount={props.project.media.length}/>
				</PageIndicatorContainer>

			</Container>
}

const Container = styled.div`
	font-family: ArvoRegular;
	color: ${Design.Colors.Orange};
`

const Shadow = styled.div<{$shadow:boolean}>`
	text-shadow: 0px 0px 20px rgba(0,0,0,${props => props.$shadow ? 0.3 : 0});
	transition: 1s all;
`

const CloseHeader = styled(Design.ProjectDetailsCloseHeader)<{$details:boolean}>`
	${props => !props.$details ? 'transform: translateX(-30vw);' : undefined}
	transition: 1s transform;
`

const Title = styled(Shadow)`
	font-size: 30px;

	position: fixed;
	top: 0vh;
	height: 16.5vh;
	left: 3vw;
	width: 30vw;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;

	transition: 1s all;

	@media (${Design.onMobile}) {
		font-size: 30px;

		position: static;
		top: unset;
		left: unset;
		height: unset;

		margin-left: 8px;
		margin-bottom: 8px;
	}
`

const ProjectDescription = styled.div<{$details:boolean}>`
	font-size: 15px;
	line-height: 32.75px;
	letter-spacing: 0.5px;

	position: fixed;
	top: 17.5vh;
	bottom: 17.5vh;
	left: ${props => !props.$details ? '-40' : '0'}vw;
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

const InfoBox = styled(Shadow)<{$details:boolean}>`
	font-size: 15px;
	line-height: 24px;
	letter-spacing: 0.5px;

	position: fixed;
	left: ${props => props.$details ? 3 : 7}vw;
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

const PageIndicatorContainer = styled.div<{$details:boolean}>`
	background: green;
	position: fixed;
	bottom: 20vh;
	top: 20vh;

	left: ${props => props.$details ? 31 : 2}vw;

	transition: 1s all;

	@media (${Design.onMobile}) {
		display: none;
	}
`

const ToggleContainer = styled.div<{$details:boolean}>`
	position: fixed;
	bottom: 0vw;
	height: 15.5vh;

	left: ${props => props.$details ? 30 : 2}vw;

	display: grid;
	justify-items: end;

	transition: 1s all;

	@media (${Design.onMobile}) {
		left: -100vw;
	}
`

const MediaColumn = styled.div<{$fullWidth : boolean}>`
	transition: 1s all;

	padding-left: ${props => props.$fullWidth ? '0' : '34'}vw;

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