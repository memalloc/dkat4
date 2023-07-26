import styled from "styled-components"

export const onMobileAspectRatio = 'max-aspect-ratio: 6/10'
export const minDetailsHeight = 'max-height: 465px'

export const MobileMediaQuery = `@media (${onMobileAspectRatio}),  (${minDetailsHeight})`

export interface ColorTheme {
	primary : string
	background : string
	secondaryBackground? : string
}

export const Colors = {
	Orange : '#FF5605',
	Yellow : 'rgb(255, 204, 0)'
}

export const BaseTheme:ColorTheme = {
	primary : "#ccc",
	background :"#172c32",
	secondaryBackground : "#1f3f46"
}

export const ThemeA:ColorTheme = {
	primary : Colors.Orange,
	background : Colors.Yellow
}

export const ThemeB:ColorTheme = {
	primary : Colors.Yellow,
	background : Colors.Orange,
	secondaryBackground : "#FFAA00"
}

export const Themes = [BaseTheme, ThemeA, ThemeB]

export const FontSizes = {
	Prompt : {
		Default : 28,
		Small : 16
	}
}

export const Hyperlink = styled.a<{$color:string, $backgroundColor:string, $italic?:boolean}>`
	text-decoration: none;

	background: ${props => props.$color};
	border: 2px solid ${props => props.$color};
	color: ${props => props.$backgroundColor};

	font-family: ${props => props.$italic === true ? 'ArvoBoldItalic' : 'ArvoBold'};
    letter-spacing: 0px;

	padding: 0px 2px;

	&:hover {
		background: transparent;
		color: ${props => props.$color};
	}
`

export const ProjectDetailsCloseHeader = styled(Hyperlink)`
	font-family: ArvoBoldItalic;
	letter-spacing: 0.5px;

    text-wrap: nowrap;

	margin-bottom: 5px;

	padding: 0px 6px;
    transform: translateX(-8px);
`