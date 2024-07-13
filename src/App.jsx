import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Get from './components/Get/Get'
import Main from './components/Main/Main'
import Tasks from './components/Tasks/Tasks'

const tg = window.Telegram.WebApp
function App() {
	useEffect(() => {
		tg.ready()
		tg.expand()
	}, [])
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/bonus' element={<Tasks />} />
				<Route path='/get' element={<Get />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
