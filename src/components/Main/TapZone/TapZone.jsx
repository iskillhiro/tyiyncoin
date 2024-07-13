import { useState } from 'react'
import style from './TapZone.module.css'

const tg = window.Telegram.WebApp

const TapZone = () => {
	const [taps, setTaps] = useState([])

	const feedback = event => {
		if (tg.HapticFeedback) {
			tg.HapticFeedback.impactOccurred('light')
		}

		const { clientX, clientY } = event
		const rect = event.currentTarget.getBoundingClientRect()

		const newTap = {
			id: Date.now(),
			x: clientX - rect.left,
			y: clientY - rect.top,
		}

		setTaps(prevTaps => [...prevTaps, newTap])

		// Remove the tap after the animation ends (1 second)
		setTimeout(() => {
			setTaps(prevTaps => prevTaps.filter(tap => tap.id !== newTap.id))
		}, 1000)
	}

	return (
		<div onClick={feedback} className={style.tap_zone}>
			<img className={style.tap_img} src='/tap.jpeg' alt='tap' />
			{taps.map(tap => (
				<span
					key={tap.id}
					className={style.tap_number}
					style={{ top: tap.y, left: tap.x }}
				>
					1
				</span>
			))}
		</div>
	)
}

export default TapZone
