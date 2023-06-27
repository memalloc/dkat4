import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export const ReactRouterTrial = () => {

	return <div>	
				<h1>react-router-dom test</h1>
				<HashRouter>
					<AnimatedRouter/>
				</HashRouter>
			</div>
}

const AnimatedRouter = () => {

	const location = useLocation()

	const BaseContent = <motion.div initial={{opacity:0}}
											animate={{opacity:1}}
											transition={{duration:0.5}}
											exit={{opacity:0}}>
									root level
									<Link to={'/project'}>navigate to project level</Link>	
								</motion.div>
	const ProjectContent = <motion.div initial={{opacity:0}}
											animate={{opacity:1}}
											transition={{duration:0.5}}
											exit={{opacity:0}}>
									project level
									<Link to={'..'} relative='path'>up/back</Link>	
								</motion.div>

	return <AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={BaseContent}/>
					<Route path='/project' element={ProjectContent}/>
				</Routes>
			</AnimatePresence>
}