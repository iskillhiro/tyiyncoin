import Navigation from '../Navigation/Navigation'
import Author from './Author/Author'
import style from './Get.module.css'
function Get() {
	return (
		<div className='container'>
			<h1 className={style.title}>Вывод средств</h1>
			<Author />
			<Navigation />
		</div>
	)
}

export default Get
