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
			const futureDate = new Date(bonusTime)
			futureDate.setHours(futureDate.getHours() + 5) // Предполагаем, что время на клиенте уже скорректировано на 5 часов
			const remainingTime = futureDate - now

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
				setIsBonusAvailable(false)
				await axiosDB.get(`/bonus/${userData.telegramId}`)

				const futureDate = new Date()
				futureDate.setHours(futureDate.getHours() + 5)
				setTimeRemaining(futureDate - new Date())

				const updateTimer = () => {
					const now = new Date()
					const remainingTime = futureDate - now
					setTimeRemaining(Math.max(remainingTime, 0))

					if (remainingTime <= 0) {
						setIsBonusAvailable(true)
						setTimeRemaining(null)
						clearInterval(timerRef.current)
					}
				}

				updateTimer()
				if (timerRef.current) {
					clearInterval(timerRef.current)
				}
				timerRef.current = setInterval(updateTimer, 1000)
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
