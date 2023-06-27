import { styled } from 'styled-components'

import { ReactRouterTrial } from './components/dev/react-router-trial'

export const App = (props:any) => {

	return	<Container>
				<ReactRouterTrial/>
			</Container>
}

const Container = styled.div`
	background: #777;
`

const FontTest = (props:{fontFamily:string}) => {
	return <div style={{...props}}>{props.fontFamily}</div>	
}