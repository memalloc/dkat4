import { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import * as Design from '../design'
import { ColorThemeContext } from "../app"

type Line = Array<string | { text : string, href : string }>

interface Props {
	content : Line
	onTyped : () => void
}

export const TypedPrompt = (props:Props) => {

	const [current, setCurrent] = useState(0)

	useEffect(()=>{
		if(current === props.content.length){
			props.onTyped()
		}
	}, [current])

	return <div>
			{
				props.content.map((content,i) => {
					const text = typeof content === 'object' ? content.text : content
					const href = typeof content === 'object' ? content.href : undefined
					return <TypingAnimation key={i} text={text} href={href}
											show={current >= i} onTyped={() => setCurrent(current+1)}/>
				})
			}
			</div>
}

interface TypingProps {
	text : string
	href? : string
	show : boolean
	onTyped : () => void
}

export const TypingAnimation = (props:TypingProps) => {

	const [text, setText] = useState('')

	useEffect(()=>{
		setText('')
	}, [props.text])

	useEffect(() => {
		if(text !== props.text && props.show){
			const delay =  5 + Math.random() * 25 * (Math.random()+1) * 3
			const timeout = setTimeout(() => {
				const nt = props.text.substring(0, text.length + 1)
				setText(nt)
			}, delay)

			return () => {
				clearTimeout(timeout)
			}
		}
		if(text === props.text){
			props.onTyped()
		}
	}, [text, props.show])

	const colorTheme = useContext(ColorThemeContext)

	const target = 	href =>  href.indexOf("mailto:") === -1 ? '_blank' : undefined
	const content = props.href ? <Design.Hyperlink $color={colorTheme.primary} $backgroundColor={colorTheme.background} href={props.href} target={target(props.href)}>{text}</Design.Hyperlink> : <>{text}</>

	return <Text>
				{ text.length > 0 && content }
			</Text>
}

const Text = styled.div`
	display: inline-block;
	margin-right: 5px;
`