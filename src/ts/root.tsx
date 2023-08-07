import { createRoot } from 'react-dom/client'

import { App } from './app'

const root = createRoot(document.getElementById('root')!)
root.render(<App/>)

// remove loading animation after fade
setTimeout(()=>{
	document.querySelector("#preload-animation").remove()
}, 2000)