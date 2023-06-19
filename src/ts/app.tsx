import { styled } from 'styled-components'

import { ResponsiveLayoutTrial } from './components/dev/responsive-layout-trial'

export const App = (props:any) => {

	return	<Container>
				<ResponsiveLayoutTrial/>
			</Container>
}

const Container = styled.div`
	background: #777;
`

const FontTest = (props:{fontFamily:string}) => {
	return <div style={{...props}}>{props.fontFamily}</div>	
}