import { HashRouter, Link, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export const ReactRouterTrial = () => {

	return <div>	
				<h1>react-router-dom test</h1>
				<HashRouter>
					<Routes>
						<Route path='/' element={<Root/>}>
							<Route path='child' element={<Child/>}/>
						</Route>
					</Routes>
					{/*<AnimatedRouter/>*/}
				</HashRouter>
			</div>
}

const Root = () => {
	return <div>
				App<br />
				<Link to='child'>link to child</Link>
				<Outlet/>
			</div>
}

const Child = () => {
	return <div>
				Child<br />
				<Link to='..'>up/back</Link>
			</div>
}

const AnimatedRouter = () => {

	const location = useLocation()
	const navigate = useNavigate()

	const BaseContent = <motion.div initial={{opacity:0}}
											animate={{opacity:1}}
											transition={{duration:0.5}}
											exit={{opacity:0}}>
									root level
									<Link to={'/project/testproject1'}>navigate to project level</Link>
									<div onClick={()=>{
										navigate('/project/testproject2')
									}}>
										programmatic navigation to project
									</div>
								</motion.div>
	const ProjectContent = <ProjectView/>

	return <AnimatePresence mode='wait'>
				<pre>
					location: { JSON.stringify(location, null, 2) }
				</pre>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={BaseContent}/>
					<Route path='/project/:id' element={ProjectContent}/>
				</Routes>
			</AnimatePresence>
}

const ProjectView = () => {

	const params = useParams()

	return <motion.div initial={{opacity:0}}
						animate={{opacity:1}}
						transition={{duration:0.5}}
						exit={{opacity:0}}>
				<pre>
					params: { JSON.stringify(params, null, 2) }
				</pre>
				project level<br />
				<Link to={'/'} relative='path'>up/back</Link>	
			</motion.div>
}