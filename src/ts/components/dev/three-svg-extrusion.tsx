import { useRef, useEffect } from 'react'

import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

const svgLogo = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
	<path id="logo" fill="orange" d="M255-1C113.6-1-1,113.6-1,255s114.6,256,256,256s256-114.6,256-256S396.4-1,255-1z M404.2,401.4
		L404.2,401.4l-73.3,0c0-20.3-16.4-36.7-36.7-36.7v-73.3c0,60.8-49.3,110-110,110c-60.8,0-110-49.3-110-110c0-60.8,49.3-110,110-110
		c20.3,0,36.7-16.4,36.7-36.7V71.4h73.3v73.3c0,60.8-49.3,110-110,110h0c-20.3,0-36.7,16.4-36.7,36.7c0,20.3,16.4,36.7,36.7,36.7
		c20.3,0,36.7-16.4,36.7-36.7h73.3v-73.3c20.3,0,36.7-16.4,36.7-36.7h73.3c0,60.8-49.3,110-110,110
		C354.9,291.4,404.2,340.7,404.2,401.4z"/>
</svg>	
`

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

export const ThreeSVGExtrusion = (props:any) =>  {

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

		const material = new THREE.MeshLambertMaterial({
														color : 0xFC5721,
														wireframe : false
													})
		const light = new THREE.PointLight()
		light.position.set(100,10,100)

		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.25)

		scene.add(light)
		scene.add(ambientLight)

		scene.background = new THREE.Color('rgb(255, 204, 0)')

		camera.position.z = 1.5

		// - - - - - - - - - - - - - - - - - - - - - -

		const loader = new SVGLoader();
		const svgData = loader.parse(svgLogoShapesOnly);

		const svgGroup = new THREE.Group()
		svgData.paths.forEach((path, i) => {
			const shapes = path.toShapes(true)

			shapes.forEach((shape, j) => {
				const geometry = new THREE.ExtrudeGeometry(shape, {
					depth: 60,
					curveSegments : 12 * 2,
					bevelEnabled: false,
					bevelSegments : 4,
					bevelThickness : 10,
					bevelSize : 10,
					bevelOffset : -10,
				})

				const mesh = new THREE.Mesh(geometry, material);
				svgGroup.add(mesh);
			})
		})
		svgGroup.scale.y *= -1

		// center model:
		const box = new THREE.Box3().setFromObject(svgGroup)
		const size = new THREE.Vector3()
		box.getSize(size)

		const yOffset = size.y / -2
		const xOffset = size.x / -2

		// Offset all of group's elements, to center them
		svgGroup.children.forEach(item => {
			item.position.x = xOffset;
			item.position.y = yOffset;
		})

		scene.add(svgGroup)

		svgGroup.position.x = -40
		svgGroup.position.y = 40

		// - - - - - - - - - - - - - - - - - - - - - -

		let renderLoop = true
		const animate = () => {

			// camera.position.x = Math.sin(Date.now()/ 1000 * 0.25) * 200 
			// camera.position.y = Math.cos(Date.now()/ 1000 * 0.25) * 200
			camera.position.z = 550
			camera.lookAt(-40,0,0)

			svgGroup.rotation.y = Date.now() / 1000 / 4
			// svgGroup.children[0].rotation.x += 0.01

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

	return 	<div>
				<div ref={mountRef}/>
			</div>

}