import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'

interface Props {
}

export const ScrollContainer = (props:PropsWithChildren<Props>) => {

	return	<Container>
				{props.children}
			</Container>
}

const Container = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;

	overflow: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
`