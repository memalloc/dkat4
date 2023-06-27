import { HashRouter, Link, Route, Routes } from 'react-router-dom'

export const ReactRouterTrial = () => {

	const baseContent = <div>
									root level
									<Link to={'/project'}>navigate to project level</Link>	
								</div>
	const projectContent = <div>
									project level
									<Link to={'..'} relative='path'>up/back</Link>	
								</div>
	return <div>	
				<h1>react-router-dom test</h1>
				<HashRouter>
					<Routes>	
						<Route path='/' element={baseContent}/>
						<Route path='/project' element={projectContent}/>
					</Routes>
				</HashRouter>
			</div>
}