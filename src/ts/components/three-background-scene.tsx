import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { keyframes, styled } from 'styled-components'
import { animate, useMotionValue, useSpring, useTransform } from 'framer-motion'

import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import { Canvas, useFrame, ThreeElements, Vector3, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

import * as Design from '../design'

import { ColorThemeContext } from '../app'

const svgLogoShapesOnly = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
<path fill="#F15922" d="M335.1,229.1v106.7h0c88.4,0,160-71.6,160-160H388.4C388.4,205.2,364.6,229.1,335.1,229.1z"/>
<path fill="#F15922" d="M388.4,495.7h106.7v0c0-88.4-71.6-160-160-160v106.7C364.6,442.4,388.4,466.2,388.4,495.7z"/>
<path fill="#F15922" d="M175.1,282.4L175.1,282.4c88.4,0,160-71.6,160-160V15.8H228.5v106.7c0,29.5-23.9,53.3-53.3,53.3
	c-88.4,0-160,71.6-160,160c0,88.4,71.6,160,160,160s160-71.6,160-160H228.5c0,29.5-23.9,53.3-53.3,53.3c-29.4,0-53.3-23.9-53.3-53.3
	C121.8,306.3,145.7,282.4,175.1,282.4z"/>
</svg>
`

type SVGShapes = Array<THREE.Shape[]>

export type AnimationMode = 'initial' | 'idle' | 'projects' | 'background'

interface Props {
	mode : AnimationMode
}

export const ThreeBackgroundScene = (props:Props) => {

	const colorTheme = useContext(ColorThemeContext)

	const primaryColor = colorTheme.primary
	const bgColor =	colorTheme.background
	const bgColor2 = colorTheme.secondaryBackground ?
						 colorTheme.secondaryBackground :
						 colorTheme.primary
	const circleFill = props.mode !== 'background' ? bgColor2 : bgColor

	const [flattenLogo, setFlattenLogo] = useState(true)
	useEffect(() => {
		setFlattenLogo(props.mode === 'initial')
	}, [props.mode])

	const d2r = THREE.MathUtils.degToRad
	const initialAnimation = {scale:[0, 1.2, 1], rotateZ : [d2r(45), d2r(-5), d2r(0)]}

	return 	<Container $color={bgColor}>

				<Canvas shadows
						gl={{antialias:true, toneMapping : THREE.NoToneMapping}}
						camera={{ position: [-1, 1, 1], fov: 90, far: 20000 }}>

					<Lights {...props}/>

					<Camera {...props}/>

					<motion.group scale={0} animate={initialAnimation} transition={{duration:0.7, delay: 0.5}}>
						<ExtrudedSVG 	svgMarkup={svgLogoShapesOnly}
										position={[-280,276,0]}
										flatten={flattenLogo}
										options={{
											depth : 60,
											curveSegments : 12 * 2
										}}>
							<motion.meshLambertMaterial color={bgColor} animate={{color : bgColor}} transition={{duration: 1}}/>
						</ExtrudedSVG>

						<group rotation={[THREE.MathUtils.degToRad(90),0,0]} position={[0,0,-10]}>
							<mesh>
								<cylinderGeometry args={[370, 370, 10, 128]}/>
								<motion.meshBasicMaterial color={circleFill} animate={{color : circleFill}} transition={{duration: 1}}/>
							</mesh>
						</group>
					</motion.group>

				</Canvas>
			</Container>
}

const Lights = (props:Props) => {

	const pointLight = useRef(null)
	const pointLightIntensity = useSpring(0, { damping : 60 })

	useFrame(({clock}) => {
		pointLight.current.intensity = pointLightIntensity.get()
	})

	useEffect(() => {
		pointLightIntensity.set(props.mode === 'initial' ? 0 : 1)
	}, [props.mode])

	return	<>
				<ambientLight color='rgb(255, 255, 255)' intensity={1}/>
				<pointLight ref={pointLight} intensity={0} position={[100, 10, 100]}/>
			</>
}

const Camera = (props:Props) => {

	const set = useThree(({ set }) => set)
	const camera = useThree(({ camera }) => camera as THREE.PerspectiveCamera)
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
		camera.fov = fov.get()
		camera.updateProjectionMatrix()
	})	

	const initalDistance = 800
	const tz = useMotionValue(initalDistance)
	const springZ = useSpring(tz, { damping : 100 }) 

	const phase = useMotionValue(Math.PI)
	const radiusTarget = useMotionValue(0)
	const radius = useSpring(radiusTarget, { damping : 60 }) 

	const tx = useTransform(phase, v => Math.sin(phase.get()) * radius.get())
	const springX = useSpring(tx, { damping : 60 })

	const yMultiplierTarget = useMotionValue(0)
	const yMultiplier = useSpring(yMultiplierTarget, { damping : 60 })
	const ty = useTransform(phase, v => Math.cos(phase.get()) * radius.get() * yMultiplier.get())
	const springY = useSpring(ty, { damping : 60 }) 

	const fovTarget = useMotionValue(90)
	const fov = useSpring(fovTarget, { damping : 60 }) 

	const distances:{[key in AnimationMode] : number} = {
		initial: initalDistance,
		background: 70,
		projects: 200,
		idle: 300
	}
	const radii:{[key in AnimationMode] : number} = {
		initial: 0,
		background: 50,
		projects: 300,
		idle: 400
	}
	const yMultipliers:{[key in AnimationMode] : number} = {
		initial: 0,
		background: 0,
		projects: 0.2,
		idle: -0.4
	}

	useLayoutEffect(()=>{
		tz.set(distances[props.mode])
		fovTarget.set(props.mode === 'background' ? 150 : 90)
		radiusTarget.set(radii[props.mode])
		yMultiplierTarget.set(yMultipliers[props.mode])

		const phaseAnimation = animate(phase, [0, Math.PI*2], { duration : 90, repeat : Infinity, repeatType : 'loop', ease : 'linear'})

		return () => {
			phaseAnimation.stop()
		}
	}, [props.mode])

	return <motion.perspectiveCamera ref={cameraRef} position={[springX,springY,springZ]}/>
}

interface ExtrudedSVGProps {
	svgMarkup : string
	options? : THREE.ExtrudeGeometryOptions
	position? : Vector3
	children? : any
	flatten? : boolean
}

const ExtrudedSVG = (props:ExtrudedSVGProps) => {
	const [svgShapes, setSvgShapes] = useState<SVGShapes>([])

	useEffect(() => {
		const loader = new SVGLoader();
		const svgData = loader.parse(svgLogoShapesOnly);
		const shapes = svgData.paths.map(path => path.toShapes(true))
		setSvgShapes(shapes)
	}, [])

	const scaleZ = useMotionValue(props.flatten ? 0.00001 : 1)
	const scaleZSpring = useSpring(scaleZ)

	useEffect(() => {
		scaleZ.set(props.flatten ? 0.00001 : 1)
	}, [props.flatten])

	return	<motion.group scale={[1,-1,scaleZSpring]} position={props.position}>
			{
			svgShapes.map((shape, i)=>{
				return	<mesh key={i}>
							<extrudeGeometry args={[shape, props.options]}/>
							{ props.children }
						</mesh>
			})
			}
			</motion.group>
}

const fadeIn = keyframes`
  from { opacity : 0 }
  to { opacity : 1 }
`

const Container = styled.div<{$color:string}>`
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;

	background: ${props => props.$color};
	transition: 1s all;
	animation: 0.5s linear ${fadeIn};
`