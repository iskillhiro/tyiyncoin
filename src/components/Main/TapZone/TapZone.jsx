import style from './TapZone.module.css'

const tg = window.Telegram.WebApp

const TapZone = () => {
	const feedback = () => {
		if (tg.HapticFeedback) {
			tg.HapticFeedback.impactOccurred('light')
		}
	}

	return (
		<div onClick={feedback} className={style.tap_zone}>
			<img className={style.tap_img} src='/tap.png' alt='tap' />
		</div>
	)
}

export default TapZone
