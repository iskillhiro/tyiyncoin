import style from './Level.module.css'

const tg = window.Telegram.WebApp

const Level = () => {
	const showAlert = () => {
		tg.showAlert('Скоро')
	}

	return (
		<div className={style.counter}>
			<div className={style.count} onClick={showAlert}>
				Standart
			</div>
		</div>
	)
}

export default Level
