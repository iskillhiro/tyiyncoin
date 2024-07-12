import { Link } from 'react-router-dom'
import style from './Author.module.css'
function Author() {
	return (
		<div className={style.author}>
			<img className={style.author_img} src='/tap.png' alt='auhtor' />
			<h2 className={style.author_name}>@rustamovrahman</h2>
			<Link to={'https://t.me/rustamovrahman'} className={style.gradient_btn}>
				Связаться
			</Link>
		</div>
	)
}

export default Author
