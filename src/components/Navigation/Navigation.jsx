import { Link } from 'react-router-dom'
import style from './Navigation.module.css'

const Navigation = () => {
	return (
		<div className={style.navigation}>
			<Link to='/bonus' className={style.link}>
				<img src='/present.svg' alt='Present icon' />
				<span>Бонус</span>
			</Link>
			<Link to='/get' className={style.link}>
				<img src='/money.svg' alt='Money icon' />
				<span>Вывод</span>
			</Link>
		</div>
	)
}

export default Navigation
