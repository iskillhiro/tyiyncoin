import { useState } from 'react'
import axiosDB from '../../../utils/axiosDB'
import style from './TapZone.module.css'

const tg = window.Telegram.WebApp

const TapZone = ({
	userData,
	setCurrentEnergy,
	setCurrentCoins,
	currentEnergy,
	currentCoins,
}) => {
	const [taps, setTaps] = useState([])

	const feedback = async event => {
		event.persist() // Сохраняем объект события
		console.log('feedback function called') // Debug log

		try {
			const response = await axiosDB.put(`/user/tap/`, {
				telegramId: userData.telegramId,
			})
			console.log('API response:', response.data) // Debug log

			// Обновляем состояние после успешного ответа
			setCurrentEnergy(currentEnergy + taps)
			setCurrentCoins(currentCoins + taps)
		} catch (error) {
			console.error('Error updating user:', error)
			// Optional: rollback changes or show an error message to the user
		}

		if (currentEnergy > 0) {
			if (tg.HapticFeedback) {
				tg.HapticFeedback.impactOccurred('light')
			}

			const newTaps = []

			// Проходим по всем касаниям (пальцам) на экране
			for (let i = 0; i < event.touches.length; i++) {
				const { clientX, clientY } = event.touches[i]
				const rect = event.target.getBoundingClientRect()

				if (!rect) {
					console.error('Unable to get bounding rect')
					continue
				}

				const newTap = {
					id: Date.now() + i, // Уникальный ID
					x: clientX - rect.left,
					y: clientY - rect.top,
				}

				newTaps.push(newTap)
			}
			setTaps(prevTaps => [...prevTaps, ...newTaps])

			setTimeout(() => {
				setTaps(prevTaps =>
					prevTaps.filter(tap => !newTaps.some(newTap => newTap.id === tap.id))
				)
			}, 1000)
		}
	}

	return (
		<>
			<div className={style.black}></div>
			<div className={style.white}></div>
			<div onTouchStart={feedback} className={style.tap_zone}>
				<img className={style.tap_img} src='/tap.jpeg' alt='tap' />
				{taps.map(tap => (
					<span
						key={tap.id}
						className={style.tap_number}
						style={{ top: `${tap.y}px`, left: `${tap.x}px` }}
					>
						+1
					</span>
				))}
			</div>
		</>
	)
}

export default TapZone
