import { useState, useRef } from 'react'
import { styled } from 'styled-components'

import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

export const ThreeFiberSVGExtrusion = (props:any) => {

	return 	<Container>
				<Canvas shadows camera={{ position: [-1, 1, 1], fov: 90 }}>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					{
						/*
						*/
					}
					<Box position={[-1.2, 0, 0]} />
					<Box position={[1.2, 0, 0]} />
					<Box position={[0, 1, 0]} />
					<Box position={[0, -1, 0]} />
				</Canvas>
			</Container>
}


function Box(props: ThreeElements['mesh']) {

	const time = useRef(0)

	const mesh = useRef<THREE.Mesh>(null!)
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)

	const center = new THREE.Vector3(0,0,0)

	useFrame((state, delta) => {
		mesh.current.rotation.x += delta

		time.current += delta
		const rad = 1

		state.camera.position.x = Math.sin(time.current/2) * rad
		state.camera.position.z = Math.cos(time.current/2) * rad

		state.camera.lookAt(center)
	})

	return <mesh	{...props} ref={mesh}
					scale={active ? 1.5 : 1}
					onClick={(event) => setActive(!active)}
					onPointerOver={(event) => setHover(true)}
					onPointerOut={(event) => setHover(false)}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={hovered ? 'hotpink' : 'red'} />
			</mesh>
}

const Container = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;

	background: rgb(255, 204, 0);
`
