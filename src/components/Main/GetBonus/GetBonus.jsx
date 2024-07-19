import { useEffect, useState } from 'react'
import axiosDB from '../../../utils/axiosDB'
import style from './GetBonus.module.css'

function GetBonus({ userData, setCurrentEnergy, currentEnergy }) {
	const [timeRemaining, setTimeRemaining] = useState(null)
	const [isBonusAvailable, setIsBonusAvailable] = useState(true)

	useEffect(() => {
		let timer
		if (timeRemaining !== null) {
			const updateTimer = () => {
				const now = new Date()
				const futureDate = new Date(localStorage.getItem('bonusExpiry'))
				const remainingTime = futureDate - now
				setTimeRemaining(Math.max(remainingTime, 0))

				if (remainingTime <= 0) {
					clearInterval(timer)
					setIsBonusAvailable(true)
					setTimeRemaining(null)
					localStorage.removeItem('bonusExpiry')
				}
			}
			updateTimer()
			timer = setInterval(updateTimer, 1000) // Update every second
		}
		return () => clearInterval(timer) // Clear interval on unmount
	}, [timeRemaining])

	const getBonus = async () => {
		try {
			if (isBonusAvailable) {
				setCurrentEnergy(currentEnergy + 99)
				setIsBonusAvailable(false)
				await axiosDB.get(`/bonus/${userData.telegramId}`)

				const futureDate = new Date()
				futureDate.setHours(futureDate.getHours() + 5)
				localStorage.setItem('bonusExpiry', futureDate.toISOString())

				setTimeRemaining(futureDate - new Date())
			}
		} catch (error) {
			console.error('Error getting bonus:', error)
		}
	}

	const formatTime = milliseconds => {
		const totalSeconds = Math.floor(milliseconds / 1000)
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
					{timeRemaining ? formatTime(timeRemaining) : '00:00:00'}
				</div>
			)}
		</div>
	)
}

export default GetBonus
