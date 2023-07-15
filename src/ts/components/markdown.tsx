import { useContext } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import * as Design from '../design'
import { ColorThemeContext } from '../app'

interface Props {
	children?: string
	disableParagraphMargin?: boolean
}

export const Markdown = (props:Props) => {
	const colorTheme = useContext(ColorThemeContext)

	const noMargin = props.disableParagraphMargin === true
	const components = {
		p : ({node, ...props}) => <Paragraph {...props} $disableMargin={noMargin}/>,
		strong : ({node, ...props}) => <Strong {...props}/>,
		a : ({node, ...props}) => <Design.Hyperlink {...props} target="_blank" $color={colorTheme.primary} $backgroundColor={colorTheme.background}/>,
	}
	return <ReactMarkdown children={props.children} components={components}/>
}

const Strong = styled.span`
`

const Paragraph = styled.p<{$disableMargin:boolean}>`
	margin: 0px;
	margin-bottom: ${props => props.$disableMargin ? undefined : '35px'};
`
