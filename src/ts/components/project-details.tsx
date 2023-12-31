import { useContext, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import * as Design from '../design'

import { ScrollContainer } from "./scroll-container"

import { Markdown } from './markdown'

import { PageIndicator } from './page-indicator'
import { DetailToggle } from './detail-toggle'
import { MediaContent, MediaData } from './media-content'
import { ColorThemeContext } from '../app'
import { AdditionalPagesIndicators } from './additional-pages-indicators'
import { ArrowIcon } from './arrow-icon'
import { MultilinePrompt } from './typed-prompt'

export interface ProjectData {
	id : string
	title : string
	info : string
	description : string
	media : Array<MediaData>
	image : string
	theme? : Design.ColorTheme
}

interface Props {
	project : ProjectData
	onViewModeUpdate : (detailsVisible:boolean) => void
}

export const ProjectDetails = (props:Props) => {
	const [showDetails, setShowDetails] = useState(true)
	
	const mediaColumnRef = useRef(null)

	const media = [...props.project.media]
	const initialMedia = media.shift()

	const colorTheme = useContext(ColorThemeContext)

	const scrollToPage = (page:number) => {
		const element = mediaColumnRef.current
		if(element){
			element.scrollTop = element.clientHeight * page
		}
	}

	useEffect(()=>{
		props.onViewModeUpdate(showDetails)
	}, [showDetails])

	return	<Container $color={colorTheme.primary}>

				<MediaColumn $fullWidth={!showDetails} ref={mediaColumnRef}>

					<Title $details={showDetails}>

						{
							Design.onMobile() &&
							<AnimatePresence>
								<MobileTopGradient	key={`bg-${colorTheme.background}`}
													$bgColor={colorTheme.background}
													transition={{duration:1}}
													initial={{opacity:0}}
											 		animate={{opacity:1}}
											 		exit={{opacity:0}}/>
							</AnimatePresence>
						}

						<BackButtonContainer initial={{opacity:0}}
											 animate={{opacity:1}}
											 transition={{delay:1.5}}
											 onClick={()=>{
											 	if(history.length > 2){
												 	// preseve the main navigation scrolling position
												 	// by navigating using history if the user has
												 	// visited from the main navigation
													history.back()
											 	} else {
											 		// navigate to the root if a projects URL has
											 		// been visited directly, to avoid returning
											 		// to the new tab page
											 		window.location.href = '/'	
											 	}
											 }}>

							<motion.div initial={{scale : 0.7, x : -100}}
										animate={{x : 0}}
										transition={{delay: 1.5}}>
								<ArrowIcon />
							</motion.div>

							<BackPrompt>
								<MultilinePrompt delay={1.5}
												 hideCursorWhenFinished
												 lines={[{line:["selected projects"], small : true}]}/>
							</BackPrompt>

						</BackButtonContainer>

						<Markdown disableParagraphMargin>
							{ props.project.title }
						</Markdown>
					</Title>

					<MediaContainer	$details={showDetails} 
									onClick={()=>{setShowDetails(!showDetails)}}>
						<MediaContent media={initialMedia}/>
					</MediaContainer>

					<InfoBox	$details={showDetails}
								as={motion.div}
								initial={{x : Design.onMobile() ? 0 : -600}}
								animate={{x : 0}}
								transition={{duration: 0.2}}>
						<Markdown disableParagraphMargin>
							{ props.project.info }
						</Markdown>
					</InfoBox>

					<ProjectDescription $details={showDetails}
										as={motion.div}
										initial={{x : Design.onMobile() ? 0 : -600}}
										animate={{x : 0}}
										transition={{duration: 0.1}}>
						<ScrollContainer>
							<Markdown>
								{ props.project.description }
							</Markdown>
						</ScrollContainer>
					</ProjectDescription>

					{
						media.map((url, i)=>{
							return	<MediaContainer key={i} $details={showDetails}
													onClick={()=>{setShowDetails(!showDetails)}}>
										<MediaContent media={url}/>
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
					<PageIndicator	container={mediaColumnRef}
									pageCount={props.project.media.length}
									onSelectPage={(page) => {
										scrollToPage(page)
									}}/>
				</PageIndicatorContainer>

				<AdditionalPagesIndicators	container={mediaColumnRef}
											details={showDetails}
											onMoveToPage={(page) => {
					const element = mediaColumnRef.current
					if(element){
						const direction = page === 'next' ? 1 : -1
						element.scrollTop += element.clientHeight * direction
					}
				}}/>

			</Container>
}

const Container = styled.div<{$color:string}>`
	font-family: ArvoRegular;
	color: ${props => props.$color};
`

const Shadow = styled.div<{$shadow:boolean}>`
	text-shadow: 0px 0px 20px rgba(0,0,0,${props => props.$shadow ? 0.3 : 0});
	transition: 1s all;
`

const hfMinHeight = 130

const DescriptionMinWidth = 360
const DescriptionMaxWidth = 550
export const DescriptionWidth = `clamp(${DescriptionMinWidth}px, 30vw, ${DescriptionMaxWidth}px)`

const MobileTopGradient = styled(motion.div)<{$bgColor:string}>`
	display: none;

	@media (${Design.onMobileAspectRatio}){
		display: unset;

		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;

		height: 80px;

		background: linear-gradient(180deg, ${props => props.$bgColor} 25%, transparent 100%);
	}
`

const BackButtonContainer = styled(motion.div)`
	margin-left: -28px;
	margin-bottom: 10px;

	display: grid;
	justify-items: start;
	justify-content: center;
	align-items: center;

	grid-template-columns: 56px 170px;
	grid-gap: 5px;

	cursor: pointer;

	${Design.MobileMediaQuery} {
		position: fixed;
		top: 1px;
		left: 0px;
		right: 0px;
		margin: 0px;

		justify-content: start;

		padding-top: 3px;
	}
`

const BackPrompt = styled.div`
	transform: translateY(1px);

	@media (${Design.minDetailsHeight}){
		display: none;
	}
`

const Title = styled.div<{$details:boolean}>`
	font-size: 30px;

	position: fixed;
	top: 0vh;
	height: 16.5vh;
	min-height: ${hfMinHeight}px;	

	left: ${props => props.$details ? '3vw' : '-900px'};
	width: 30vw;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;

	transition: 1s all;

	${Design.MobileMediaQuery} {
		font-size: 30px;

		position: static;
		top: unset;
		left: unset;
		height: unset;

		margin-left: 4vw;
		margin-right: 4vw;
		margin-bottom: 8px;
		margin-top: 20px;

		width: 92vw;
		max-width: ${DescriptionMaxWidth}px;
	}

	@media (${Design.minDetailsHeight}) {
		min-height: unset;
		margin-bottom: 0px;
	}
`

const ProjectDescription = styled.div<{$details:boolean}>`
	font-size: 15px;
	line-height: 32.75px;
	letter-spacing: 0.5px;

	position: fixed;
	top: 0vh;
	margin-top: clamp(${hfMinHeight}px, 17.5vh, 17.5vh);
	bottom: 0vh;
	margin-bottom: clamp(${hfMinHeight}px, 17.5vh, 17.5vh);
	left: ${props => !props.$details ? '-600' : '0'}px;

	width: ${DescriptionWidth};

	transition: 1s all;

	${Design.MobileMediaQuery} {
		position: static;
		top: unset;
		left: unset;
		bottom: unset;
		width: unset;

		max-width: ${DescriptionMaxWidth}px;

		border: none;
		margin: 0vw 4vw;
	}
`

const InfoBox = styled.div<{$details:boolean}>`
	font-size: 15px;
	line-height: 24px;
	letter-spacing: 0.5px;

	position: fixed;
	left: ${props => props.$details ? '3vw' : '-850px'};
	bottom: 0vw;
	height: 16.5vh;
	min-height: ${hfMinHeight}px;	

	transition: 1s all;

	${Design.MobileMediaQuery} {
		font-size: 15px;

		position: static;
		top: unset;
		left: unset;
		height: unset;
		min-height: unset;

		width: 92vw;
		max-width: ${DescriptionMaxWidth}px;

		margin-bottom: 22px;
		margin-left: 4vw;
		margin-right: 4vw;
	}
`

const PageIndicatorContainer = styled.div<{$details:boolean}>`
	background: green;
	position: fixed;
	bottom: 20vh;
	top: 20vh;

	left: ${props => props.$details ? DescriptionWidth : '2vw'};
	margin-left: -5px;

	transition: 1s all;

	${Design.MobileMediaQuery} {
		display: none;
	}
`

const toggleButtonPadding = '0.5vh'
const ToggleContainer = styled.div<{$details:boolean}>`
	position: fixed;
	bottom: 0vw;
	height: calc(16.5vh - ${toggleButtonPadding});
	min-height: calc(${hfMinHeight}px - ${toggleButtonPadding});
	padding-top: ${toggleButtonPadding};

	left: ${props => props.$details ? DescriptionWidth : '34px'};
	margin-left: -18px;

	display: grid;
	justify-items: end;

	transition: 1s all;

	${Design.MobileMediaQuery} {
		left: -100vw;
	}
`

const MediaColumn = styled.div<{$fullWidth : boolean}>`
	transition: 1s padding-left;

	padding-left: ${props => props.$fullWidth ? '0vw' : `clamp(${DescriptionMinWidth + 40}px, 34vw, 620px)`};

	position: fixed;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;

	overflow-y: scroll;
	overflow-x: clip;

	scroll-snap-type: y mandatory;
	scroll-behavior: smooth;

	${Design.MobileMediaQuery} {
		padding: 0px;
		scroll-snap-type: none;
		padding-bottom: 15vh;
	}

	/*
	center content only in landscape orientation on mobile otherwise
	a slight left margin is added to videos in portrait orientation
	*/
	@media (${Design.minDetailsHeight}) {
		display: grid;
		justify-items: center;
	}
`

const MediaContainer = styled.div<{$details:boolean}>`
	height: 100vh;

	scroll-snap-align: center;
	
	display: grid;
	align-items: stretch;
	justify-items: stretch;

	position: relative; /* to enable positioning for iOS video overlay */

	cursor: ${props => props.$details ? 'zoom-in' : 'zoom-out'};

	${Design.MobileMediaQuery} {
		position: static; /* reset to default to ensure back button stays on top */
		height: auto;
	}
`