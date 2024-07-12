import { Link } from 'react-router-dom'
import style from './Navigation.module.css'
const Navigation = () => {
	return (
		<div className={style.navigation}>
			<Link to='/' className={style.gradient_btn}>
				Майнинг
			</Link>
			<Link to='/tasks' className={style.gradient_btn}>
				Задания
			</Link>
			<Link to='/get' className={style.gradient_btn}>
				Вывод
			</Link>
		</div>
	)
}

export default Navigation
