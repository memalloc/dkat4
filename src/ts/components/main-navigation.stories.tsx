import { styled } from 'styled-components'
import { MainNavigation } from './main-navigation'

export default {
	title: 'dkat4/UI'
}

export const MainNavigationStory = () => {
	return <Container>
				<MainNavigation/>
			</Container>
}
MainNavigationStory.storyName = 'Main Navigation'

const Container= styled.div`
`