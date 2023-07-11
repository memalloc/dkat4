import { styled } from 'styled-components'

import { ScrollContainer } from "./scroll-container"
import { LoremIpsum } from './dev/lorem-ipsum'

export default {
	title: 'dkat4/UI'
}

export const ScrollContainerStory = () => {
	return <ContainerOne>
					<ScrollContainer>
						<LoremIpsum paragraphs={20}/>
					</ScrollContainer>
				</ContainerOne>
}
ScrollContainerStory.storyName = 'Scroll Container'

const ContainerOne = styled.div`
	position: absolute;
	top: 10vh;
	left: 10vw;
	width: 70vw;
	bottom: 10vh;

	background: #777;
`