import { useEffect, useRef, useState } from 'react'
import axiosDB from '../../../utils/axiosDB'
import style from './GetBonus.module.css'

function GetBonus({ userData, setCurrentEnergy, currentEnergy }) {
	const [timeRemaining, setTimeRemaining] = useState(null)
	const [isBonusAvailable, setIsBonusAvailable] = useState(true)
	const timerRef = useRef(null)

	useEffect(() => {
		const updateTimer = () => {
			const now = new Date()
			const bonusTime = new Date(userData.bonusClaimed)
			const remainingTime = bonusTime - now

			if (remainingTime > 0) {
				setIsBonusAvailable(false)
				setTimeRemaining(remainingTime)
			} else {
				setIsBonusAvailable(true)
				setTimeRemaining(null)
			}
		}

		if (userData.bonusClaimed) {
			updateTimer()
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
			timerRef.current = setInterval(updateTimer, 1000)

			return () => clearInterval(timerRef.current)
		}
	}, [userData.bonusClaimed])

	const getBonus = async () => {
		try {
			if (isBonusAvailable) {
				setCurrentEnergy(currentEnergy + 99)
				const response = await axiosDB.get(`/bonus/${userData.telegramId}`)
				console.log(response.data) // Для проверки ответа от сервера
				setIsBonusAvailable(false)

				// Запускаем фейковый таймер на 5 часов
				const fakeTimerDuration = 5 * 60 * 60 * 1000
				setTimeRemaining(fakeTimerDuration)

				const updateFakeTimer = () => {
					setTimeRemaining(prev => {
						const newRemainingTime = Math.max(prev - 1000, 0)
						if (newRemainingTime === 0) {
							setIsBonusAvailable(true)
							clearInterval(timerRef.current)
						}
						return newRemainingTime
					})
				}

				if (timerRef.current) {
					clearInterval(timerRef.current)
				}
				timerRef.current = setInterval(updateFakeTimer, 1000)
			}
		} catch (error) {
			console.error('Error getting bonus:', error)
		}
	}

	const formatTime = milliseconds => {
		const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0)
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60

		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
			2,
			'0'
		)}:${String(seconds).padStart(2, '0')}`
	}

	return (
		<div className={style.bonusCircle}>
			{isBonusAvailable ? (
				<div onClick={getBonus} className={style.bonusText}>
					+99
				</div>
			) : (
				<div className={style.timerText}>
					{timeRemaining ? formatTime(timeRemaining) : ''}
				</div>
			)}
		</div>
	)
}

export default GetBonus
