import { useContext, useState } from 'react'
import { styled } from 'styled-components'
import * as  svgToMiniDataURI from 'mini-svg-data-uri'

import * as Design from '../design'
import { ColorThemeContext } from '../app'

interface Props {
	url : string	
}

export const MediaContent = (props:Props) => {
	const colorTheme = useContext(ColorThemeContext)

	const [controls, setControls] = useState(false)

	const onMobile = Design.onMobile()

	if(props.url.includes('.mp4')){
		const poster = Design.onMobile() ? undefined : svg(colorTheme)
		return <>
					{
						// render invisible div on top of video to mitigate
						// scrolling issue described below for iPadOS.
						// this is necessary since displaying the controls
						// is not an option for the desktop layout
						!onMobile &&
						<VideoOverlay/>
					}
					<Video	src={props.url} autoPlay loop muted playsInline
						poster={poster} controls={controls}
						onTouchStart={()=>{
							// activate controls after initial touch on mobile to:
							// 1. ensure initial playback without controls overlay
							// 2. mitigate mobile safaris inability to scroll the
							// page when touching a video element without controls
							// 3. enable fullscreening the video (also useful on android)
							if(onMobile){
								setControls(true)
							}
						}}/>
				</>
	} else {
		return <Image src={props.url}/>
	}
}

const VideoOverlay = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;

	background: transparent;
`

const Video = styled.video`
	width: 100%;
	max-height: 100vh;

	${Design.MobileMediaQuery} {
		margin: 20px 0px;
		width: unset;
	}

	@media (${Design.onMobileAspectRatio}){
		height: calc(9/16*100vw);
	}	

	@media (${Design.minDetailsHeight}){
		height: 100vh;
	}	
`

const Image = styled.img`
	object-fit: contain;
	max-width: 100%;
	max-height: 100vh;

	pointer-events: none;

	${Design.MobileMediaQuery} {
		width: 100%;
		margin: 20px 0px;
	}
`

const svg = (theme:Design.ColorTheme) => {
	return svgToMiniDataURI(`
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 1920 1080" enable-background="new 0 0 512 512" xml:space="preserve" width="10vw" height="10vw">
			<style>
				#logo { transform-origin: center; }
			</style>

			<g opacity="0">
				<animate attributeName="opacity" from="0" to="1" dur="1s" begin="1s" fill="freeze" />
				<rect width="1917" height="1080" style="fill:${theme.background};opacity:0.6" />
				<rect width="1917" height="1080" style="fill:transparent;stroke:${theme.primary};stroke-width:3;" />

				<g id="logo">
					<animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite"/>
					<animateTransform	attributeName="transform" type="scale" 
										values="0.7;1;0.7" begin="0s" dur="3s" repeatCount="indefinite"/>

					<g transform="translate(512,192)" transform-origin="center">
						<g transform="scale(0.7)" transform-origin="center">
							<circle cx="256" cy="256" r="256"  fill="${theme.primary}"/>
						</g>
						<g transform="scale(0.5) translate(-290 -130)" transform-origin="center">
							<path fill="${theme.background}" d="M335.1,229.1v106.7h0c88.4,0,160-71.6,160-160H388.4C388.4,205.2,364.6,229.1,335.1,229.1z"/>
							<path fill="${theme.background}" d="M388.4,495.7h106.7v0c0-88.4-71.6-160-160-160v106.7C364.6,442.4,388.4,466.2,388.4,495.7z"/>
							<path fill="${theme.background}" d="M175.1,282.4L175.1,282.4c88.4,0,160-71.6,160-160V15.8H228.5v106.7c0,29.5-23.9,53.3-53.3,53.3
								c-88.4,0-160,71.6-160,160c0,88.4,71.6,160,160,160s160-71.6,160-160H228.5c0,29.5-23.9,53.3-53.3,53.3c-29.4,0-53.3-23.9-53.3-53.3 C121.8,306.3,145.7,282.4,175.1,282.4z"/>
						</g>
					</g>
				</g>
			</g>
		</svg>
`)}