import { styled } from 'styled-components'

import * as Design from '../design'

interface Props {
	onThemeChange : (theme:Design.ColorTheme) => void
}

export const ThemeSwitcher = (props:Props) => {
	
	return	<Container>
			{
				Design.Themes.map((theme, index) => {
					return <Theme key={index} $theme={theme} onClick={() => {
						props.onThemeChange(theme)
					}}/>
				})
			}
			</Container>
}

const Container = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;

	display: flex;
`

const size = '20px'

const Theme = styled.div<{$theme:Design.ColorTheme}>`
	background: ${props => props.$theme.primary};
	border: 3px solid ${props => props.$theme.background};

	width: ${size};
	height: ${size};

	border-radius: ${size};
	margin-right: 8px;

	cursor: pointer;
`