import { useRef, useEffect } from 'react'

import * as THREE from 'three'

export const ThreeBase = (props:any) =>  {

	const mountRef = useRef(null)

	useEffect(()=>{

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera( 75, 16/9, 0.1, 1000 )
		const renderer = new THREE.WebGLRenderer({antialias : true})

		renderer.setSize(1920, 1080)
		mountRef.current.appendChild(renderer.domElement )

		renderer.domElement.style.width = '100%'
		renderer.domElement.style.height = 'auto'

		// - - - - - - - - - - - - - - - - - - - - - -

		const geometry = new THREE.BoxGeometry(1,1,1)
		const material = new THREE.MeshLambertMaterial({color : 0xFFCC00})
		const cube = new THREE.Mesh(geometry, material)

		const light = new THREE.PointLight()
		light.position.set(10,10,10)

		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.25)

		scene.add(cube)
		scene.add(light)
		scene.add(ambientLight)

		camera.position.z = 1.5

		// - - - - - - - - - - - - - - - - - - - - - -

		let renderLoop = true
		const animate = () => {

			cube.rotation.x += 0.01
			cube.rotation.y += 0.01
			cube.position.z = Math.sin(Date.now()/ 1000) - 1

			renderer.render( scene, camera )

			if(renderLoop){
				requestAnimationFrame(animate)
			}
		}

		animate()

		return () => {
			if(mountRef.current !== null){
				mountRef.current.removeChild(renderer.domElement)
			}
			renderLoop = false
			// TODO disposeEverything()
		}

	})

	return 	<div ref={mountRef}/>
}