import styled from "styled-components"

export const onMobile = 'max-width: 425px'
export const onMobileAspectRatio = 'max-aspect-ratio: 6/10'

export const Colors = {
	Orange : '#FF5605'
}

export const Hyperlink = styled.a`
	text-decoration: none;

	background: ${Colors.Orange};
	border: 2px solid ${Colors.Orange};
	color: #172C32;

	font-family: ArvoBold;
    letter-spacing: 0px;

	padding: 0px 2px;

	&:hover {
		background: transparent;
		color: ${Colors.Orange};
	}
`
