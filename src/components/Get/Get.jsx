import { useNavigate } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Author from './Author/Author'
import style from './Get.module.css'

const tg = window.Telegram.WebApp
function Get() {
	const navigate = useNavigate()
	const backButton = tg.BackButton

	backButton.onClick(() => {
		navigate('/')
	})

	backButton.show()

	return (
		<div className='container'>
			<h1 className={style.title}>Вывод средств</h1>
			<Author />
			<Navigation />
		</div>
	)
}

export default Get
