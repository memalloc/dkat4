import { styled } from 'styled-components'

import * as Design from '../design'

interface Props {
	url : string	
}

export const MediaContent = (props:Props) => {
	if(props.url.includes('.mp4')){
		return <Video src={props.url} autoPlay loop muted playsInline/>
	} else {
		return <Image src={props.url}/>
	}
}

const Video = styled.video`
	width: 100%;
	max-height: 100vh;
`

const Image = styled.img`
	max-width: 100%;
	max-height: 100vh;

	@media (${Design.onMobileAspectRatio}) {
		width: 100%;
	}
`
