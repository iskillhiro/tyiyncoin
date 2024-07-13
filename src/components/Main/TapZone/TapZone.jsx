import { useState } from 'react'
import style from './TapZone.module.css'

const tg = window.Telegram.WebApp

const TapZone = () => {
	const [taps, setTaps] = useState([])

	const feedback = event => {
		if (tg.HapticFeedback) {
			tg.HapticFeedback.impactOccurred('light')
		}

		const newTaps = []

		// Loop through touches (fingers) on the screen
		for (let i = 0; i < event.touches.length; i++) {
			const { clientX, clientY } = event.touches[i]
			const rect = event.currentTarget.getBoundingClientRect()

			const newTap = {
				id: Date.now() + i, // Ensure unique ID
				x: clientX - rect.left,
				y: clientY - rect.top,
			}

			newTaps.push(newTap)
		}

		setTaps(prevTaps => [...prevTaps, ...newTaps])

		// Remove the taps after the animation ends (1 second)
		setTimeout(() => {
			setTaps(prevTaps =>
				prevTaps.filter(tap => !newTaps.some(newTap => newTap.id === tap.id))
			)
		}, 1000)
	}

	return (
		<div onTouchStart={feedback} className={style.tap_zone}>
			<img className={style.tap_img} src='/tap.jpeg' alt='tap' />
			{taps.map(tap => (
				<span
					key={tap.id}
					className={style.tap_number}
					style={{ top: tap.y, left: tap.x }}
				>
					+1
				</span>
			))}
		</div>
	)
}

export default TapZone
