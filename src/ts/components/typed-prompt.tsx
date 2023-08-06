import React from "react"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import * as Design from '../design'
import { ColorThemeContext } from "../app"

type Line = Array<string | { text : string, href : string}>
type LineWithOptions = { line : Line, small? : boolean, italic? : boolean }
export type PromptLine = Line | LineWithOptions

interface MultilinePromptProps {
	lines : Array<PromptLine>
	delay? : number
	onTyped? : () => void
	hideCursorWhenFinished? : boolean
}

export const MultilinePrompt = (props:MultilinePromptProps) => {

	const [current, setCurrent] = useState(0)
	const [cursorHidden, setCursorHidden] = useState(false)

	useEffect(()=>{
		if(current === props.lines.length){
			props.onTyped()
		}
	}, [current])

	const colorTheme = useContext(ColorThemeContext)

	const fadeDelay = props.delay ? props.delay : 1
	const initialDelay = fadeDelay * 1000 + 1000
	const newlineDelay = 300

	const smallCursor = (props.lines[current] as LineWithOptions).small === true

	return	<Container animate={{opacity:[0,1]}} transition={{duration:1, delay: fadeDelay}}>
				<div>
				{
				props.lines.map((promptLine, i) => {
					const delay = i === 0 ? initialDelay : newlineDelay
					return	<React.Fragment key={i}>
							{
								i <= current &&
								<TypedPrompt key={i} content={promptLine} delay={delay} onTyped={() => {
									if(current < props.lines.length - 1){
										setCurrent(current+1)
									} else {
										if(props.hideCursorWhenFinished === true){
											setCursorHidden(true)
										}
									}
								}}/>
							}
							</React.Fragment>
				})
				}
				</div>
				<Cursor $color={colorTheme.primary}
						$small={smallCursor}
						animate={cursorHidden ? { opacity : [1, 0] } : {opacity: [0,0,0,0,1,1,0.5]}}
						transition={cursorHidden ? { duration : 0.5} : {duration : 0.5, repeat : Infinity}}/>
			</Container>
}

const CursorWidth = '4px'

const Container = styled(motion.div)`
	display: grid;
	grid-template-columns: 1fr ${CursorWidth};
	align-items: end;
	grid-gap: 7px;
`

const Cursor = styled(motion.div)<{$color:string, $small:boolean}>`
	background: ${props => props.$color};
	width: ${CursorWidth};
	height: 24px;
	margin-bottom: ${props => props.$small ? '14px' : '10px'};

	transition: 1s background;
`

interface Props {
	content : PromptLine
	delay? : number
	onTyped : () => void
}

export const TypedPrompt = (props:Props) => {

	const [current, setCurrent] = useState(0)
	const hasDelay = props.delay !== undefined && props.delay > 0
	const [wait, setWait] = useState(hasDelay)

	const optionLine = props.content as LineWithOptions
	const line:Line = optionLine.line !== undefined ? optionLine.line : props.content as Line

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
		if(current === line.length && props.onTyped !== undefined){
			props.onTyped()
		}
	}, [current])

	return <PromptLine $small={optionLine.small === true}>
			{
				line.map((content,i) => {
					const text = typeof content === 'object' ? content.text : content
					const href = typeof content === 'object' ? content.href : undefined
					return <TypingAnimation key={i} text={text} href={href}
											show={!wait && current >= i}
											italic={optionLine.italic === true}
											onTyped={() => setCurrent(current+1)}/>
				})
			}
			</PromptLine>
}

const PromptLine = styled.div<{$small:boolean}>`
	height: ${Design.FontSizes.Prompt.Default * 1.5}px;
	font-size: ${props => props.$small === true ? Design.FontSizes.Prompt.Small : Design.FontSizes.Prompt.Default}px;
	margin-bottom: ${props => props.$small ? '5px' : undefined};

	display: flex;
    justify-content: flex-end;
    align-items: center;
`

interface TypingProps {
	text : string
	href? : string
	show : boolean
	italic : boolean
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
	const content = props.href ? <Design.Hyperlink	$color={colorTheme.primary}
															$backgroundColor={colorTheme.background}
															$italic={props.italic}
															href={props.href}
															target={target(props.href)}>
											{text}
										</Design.Hyperlink> : <>{text}</>

	return <>
			{
				text.length > 0 &&
				<Text $margin={props.href !== undefined} $italic={props.italic}>
					{ text.length > 0 && content }
				</Text>
			}
			</>
}

const Text = styled.div<{$margin:boolean, $italic}>`
	display: inline-block;
	margin-left: ${props => props.$margin ? '8px' : undefined};
	font-family: ${props => props.$italic ? 'ArvoItalic' : undefined};
`