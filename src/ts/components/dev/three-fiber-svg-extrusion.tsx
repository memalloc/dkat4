import * as React from 'react'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { styled } from 'styled-components'

import * as Design from '../../design'

import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import { Canvas, useFrame, ThreeElements, Vector3, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { ColorThemeContext } from '../../app'
import { animate, useMotionValue, useSpring } from 'framer-motion'

const svgLogoShapesOnly = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
<path fill="#F15922" d="M335.1,229.1v106.7h0c88.4,0,160-71.6,160-160H388.4C388.4,205.2,364.6,229.1,335.1,229.1z"/>
<path fill="#F15922" d="M388.4,495.7h106.7v0c0-88.4-71.6-160-160-160v106.7C364.6,442.4,388.4,466.2,388.4,495.7z"/>
<path fill="#F15922" d="M175.1,282.4L175.1,282.4c88.4,0,160-71.6,160-160V15.8H228.5v106.7c0,29.5-23.9,53.3-53.3,53.3
	c-88.4,0-160,71.6-160,160c0,88.4,71.6,160,160,160s160-71.6,160-160H228.5c0,29.5-23.9,53.3-53.3,53.3c-29.4,0-53.3-23.9-53.3-53.3
	C121.8,306.3,145.7,282.4,175.1,282.4z"/>
</svg>
`

type SVGShapes = Array<THREE.Shape[]>

interface Props {
	mode : 'initial' | 'background'
}

export const ThreeFiberSVGExtrusion = (props:Props) => {

	const colorTheme = useContext(ColorThemeContext)

	const primaryColor = colorTheme.primary
	const bgColor =	colorTheme.background
	const bgColor2 = colorTheme.secondaryBackground ?
						 colorTheme.secondaryBackground :
						 colorTheme.primary
	const circleFill = props.mode === 'initial' ? bgColor2 : bgColor

	return 	<Container $color={bgColor}>

				<CenterContainer $color="transparent">
					<SVGBackground viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
						<circle cx="50" cy="50" r="40" fill={circleFill} style={{transition:'1s all'}}/>
					</SVGBackground>
				</CenterContainer>

				<Canvas shadows
						gl={{antialias:true, toneMapping : THREE.NoToneMapping}}
						camera={{ position: [-1, 1, 1], fov: 90, far: 20000 }}>

					<ambientLight color='rgb(255, 204, 0)' intensity={1.25}/>
					<pointLight position={[100, 10, 100]} />

					<Camera {...props}/>

					{/*<CameraMovement width={props.mode === 'initial' ? 1000 : 200}/>*/}

					<ExtrudedSVG 	svgMarkup={svgLogoShapesOnly}
									position={[-280,276,0]}
									options={{
										depth : 60,
										curveSegments : 12 * 2
									}}>
							<motion.meshLambertMaterial animate={{color : bgColor}} transition={{duration: 1}}/>
					</ExtrudedSVG>

				</Canvas>
			</Container>
}

const Camera = (props:Props) => {

	const set = useThree(({ set }) => set)
	const camera = useThree(({ camera }) => camera)
	const size = useThree(({ size }) => size)

	const cameraRef = useRef()

	useLayoutEffect(() => {
		const cam = cameraRef.current as THREE.PerspectiveCamera
		if (cam) {
			cam.aspect = size.width / size.height;
	  		cam.updateProjectionMatrix();
		}
  }, [size])

	useLayoutEffect(()=>{
		if (cameraRef.current) {
			const oldCam = camera
			set(() => ({ camera: cameraRef.current }))
			return () => set(() => ({ camera: oldCam }))
	}
	}, [cameraRef.current])

	useFrame(()=>{
		camera.lookAt(0,0,0)
	})	

	const mvZ = useMotionValue(800)
	const springZ = useSpring(mvZ, { damping : 60 }) 

	const tx = useMotionValue(100)
	const springX = useSpring(tx, { damping : 60 }) 

	useLayoutEffect(()=>{
		mvZ.set(props.mode === 'initial' ? 600 : 200)

		const txTarget = props.mode === 'initial' ? 500 : 50

		const animation = animate(tx, [-txTarget, txTarget], { duration : 15, repeat : Infinity, repeatType : 'reverse', ease : 'easeInOut'})

		return () => {
			animation.stop()
		}
	}, [props.mode])

	return <motion.perspectiveCamera ref={cameraRef} fov={90} position={[springX,0,springZ]}/>
}

const CameraMovement = (props:{width:number}) => {
	const time = useRef(0)
	let dollyWidth = 1000

	useFrame((state, delta) => {
		time.current += delta

		const camera = state.camera as THREE.PerspectiveCamera

		const factor = (Math.sin(time.current)+ 1)/2

		const fov = 30 + 120 * factor

		const dollyZoomDistance = (width, fov) => { 
			return width / (2*Math.tan( THREE.MathUtils.degToRad(fov*0.5))) 
		}

		dollyWidth -= (dollyWidth-props.width) * 0.1

		camera.position.z = Math.sin(time.current/4) *  dollyZoomDistance(dollyWidth, fov)
		camera.position.x = Math.cos(time.current/4) *  dollyZoomDistance(dollyWidth, fov)

		camera.lookAt(0,0,0)

		camera.fov = fov
		camera.updateProjectionMatrix()
	})

	return <React.Fragment/>
}

interface ExtrudedSVGProps {
	svgMarkup : string
	options? : THREE.ExtrudeGeometryOptions
	position? : Vector3
	children? : any
}

const ExtrudedSVG = (props:ExtrudedSVGProps) => {
	const [svgShapes, setSvgShapes] = useState<SVGShapes>([])

	useEffect(()=>{
		const loader = new SVGLoader();
		const svgData = loader.parse(svgLogoShapesOnly);
		const shapes = svgData.paths.map(path => path.toShapes(true))
		setSvgShapes(shapes)
	}, [])

	return	<group scale={[1,-1,1]} position={props.position}>
			{
			svgShapes.map((shape, i)=>{
				return	<mesh key={i}>
							<extrudeGeometry args={[shape, props.options]}/>
							{ props.children }
						</mesh>
			})
			}
			</group>
}

const Container = styled.div<{$color:string}>`
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;

	background: ${props => props.$color};
	transition: 1s all;
`

const CenterContainer = styled(Container)`
	width 100vw;
	height: 100vh;

	display: grid;
	place-items: center;
`

const SVGBackground = styled.svg`
	max-height: 100vh;
`
