import { styled } from 'styled-components'

import { LoremIpsum } from './components/lorem-ipsum'

export const App = (props:any) => {

	return	<Container>
				<h1>Hello World</h1>
				<LoremIpsum/>
			</Container>
}

const Container = styled.div`
	background: #777;
`