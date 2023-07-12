import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

interface Props {
	children?: string
	disableParagraphMargin?: boolean
}

export const Markdown = (props:Props) => {
	const noMargin = props.disableParagraphMargin === true
	const components = {
		p : ({node, ...props}) => <Paragraph {...props} disableMargin={noMargin}/>,
		strong : ({node, ...props}) => <Strong {...props}/>
	}
	return <ReactMarkdown children={props.children} components={components}/>
}

const Strong = styled.span`
`

const Paragraph = styled.p<{disableMargin:boolean}>`
	margin: 0px;
	margin-bottom: ${props => props.disableMargin ? undefined : '35px'};
`
