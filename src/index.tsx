import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Blog } from './blog.tsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Blog />
		</BrowserRouter>
	</StrictMode>,
)
