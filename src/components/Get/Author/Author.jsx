import { Link } from 'react-router-dom'
import style from './Author.module.css'
function Author() {
	return (
		<div className={style.author}>
			<img className={style.author_img} src='/tap.jpeg' alt='auhtor' />
			<h2 className={style.author_name}>@tc3050100</h2>
			<Link to={'https://t.me/tc3050100'} className={style.gradient_btn}>
				Связаться
			</Link>
		</div>
	)
}

export default Author
