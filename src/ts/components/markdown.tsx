import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

interface Props {
	children?: string
	disableParagraphMargin?: boolean
}

export const Markdown = (props:Props) => {
	const noMargin = props.disableParagraphMargin === true
	const components = {
		p : ({node, ...props}) => <Paragraph {...props} $disableMargin={noMargin}/>,
		strong : ({node, ...props}) => <Strong {...props}/>,
		a : ({node, ...props}) => <Hyperlink {...props} target="_blank"/>,
	}
	return <ReactMarkdown children={props.children} components={components}/>
}

const Strong = styled.span`
`

const Paragraph = styled.p<{$disableMargin:boolean}>`
	margin: 0px;
	margin-bottom: ${props => props.$disableMargin ? undefined : '35px'};
`

const Hyperlink = styled.a`
	text-decoration: none;

	background: #FF5605;
	border: 2px solid #FF5605;
	color: #172C32;

	font-family: ArvoBold;
    letter-spacing: 0px;

	padding: 0px 2px;

	&:hover {
		background: transparent;
		color: #FF5605;
	}
`