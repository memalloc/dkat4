import { styled } from 'styled-components'

import { LoremIpsum } from './components/lorem-ipsum'

export const App = (props:any) => {

	return	<Container>
				<h1>Hello World</h1>
				<FontTest fontFamily='ArvoRegular'/>
				<FontTest fontFamily='ArvoItalic'/>
				<FontTest fontFamily='ArvoBold'/>
				<FontTest fontFamily='ArvoBoldItalic'/>

				<LoremIpsum/>
			</Container>
}

const Container = styled.div`
	background: #777;
`

const FontTest = (props:{fontFamily:string}) => {
	return <div style={{...props}}>{props.fontFamily}</div>	
}