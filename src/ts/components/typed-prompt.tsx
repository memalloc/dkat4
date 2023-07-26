import React from "react"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import * as Design from '../design'
import { ColorThemeContext } from "../app"

export type Line = Array<string | { text : string, href : string }>

interface MultilinePromptProps {
	lines : Array<Line>
	onTyped : () => void
}

export const MultilinePrompt = (props:MultilinePromptProps) => {

	const [current, setCurrent] = useState(0)

	useEffect(()=>{
		if(current === props.lines.length){
			props.onTyped()
		}
	}, [current])

	const colorTheme = useContext(ColorThemeContext)

	const fadeDelay = 1
	const initialDelay = fadeDelay * 1000 + 1000
	const newlineDelay = 300

	return	<Container animate={{opacity:[0,1]}} transition={{duration:1, delay: fadeDelay}}>
				<div>
				{
				props.lines.map((line, i) => {
					const delay = i === 0 ? initialDelay : newlineDelay
					return	<React.Fragment key={i}>
							{
								i <= current &&
								<TypedPrompt key={i} content={line} delay={delay} onTyped={() => {
									setCurrent(current+1)
								}}/>
							}
							</React.Fragment>
				})
				}
				</div>
				<Cursor $color={colorTheme.primary}
						animate={{opacity:[0,0,0,0,1,1,0.5]}}
						transition={{duration : 0.5, repeat : Infinity}}/>
			</Container>
}

const CursorWidth = '4px'

const Container = styled(motion.div)`
	display: grid;
	grid-template-columns: 1fr ${CursorWidth};
	align-items: end;
	grid-gap: 7px;
`

const Cursor = styled(motion.div)<{$color:string}>`
	background: ${props => props.$color};
	width: ${CursorWidth};
	height: 24px;
	margin-bottom: 8px;

	transition: 1s background;
`

interface Props {
	content : Line
	delay? : number
	onTyped : () => void
}

export const TypedPrompt = (props:Props) => {

	const [current, setCurrent] = useState(0)
	const hasDelay = props.delay !== undefined && props.delay > 0
	const [wait, setWait] = useState(hasDelay)

	useEffect(()=>{
		if(hasDelay){
			const timeout = setTimeout(() => {
				setWait(false)
			}, props.delay)
			return () => {
				clearTimeout(timeout)
			}
		}
	}, [])

	useEffect(()=>{
		if(current === props.content.length){
			props.onTyped()
		}
	}, [current])

	return <PromptLine>
			{
				props.content.map((content,i) => {
					const text = typeof content === 'object' ? content.text : content
					const href = typeof content === 'object' ? content.href : undefined
					return <TypingAnimation key={i} text={text} href={href}
											show={!wait && current >= i} onTyped={() => setCurrent(current+1)}/>
				})
			}
			</PromptLine>
}

const PromptLine = styled.div`
	height: 30px;
`

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

	return <>
			{
				text.length > 0 &&
				<Text $margin={props.href !== undefined}>
					{ text.length > 0 && content }
				</Text>
			}
			</>
}

const Text = styled.div<{$margin:boolean}>`
	display: inline-block;
	margin-left: ${props => props.$margin ? '8px' : undefined};
`