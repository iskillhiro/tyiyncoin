import { useEffect, useState } from 'react'
import axiosDB from '../../../utils/axiosDB'
import style from './GetBonus.module.css'

function GetBonus({ userData, setCurrentEnergy, setBonusClaimed }) {
	const [timeRemaining, setTimeRemaining] = useState(null)
	const [isBonusAvailable, setIsBonusAvailable] = useState(true)

	useEffect(() => {
		if (userData.bonusClaimed) {
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

			updateTimer()
			const timer = setInterval(updateTimer, 1000) // Update every second

			return () => clearInterval(timer) // Clear interval on component unmount
		}
	}, [userData.bonusClaimed])

	const getBonus = async () => {
		try {
			const response = await axiosDB.get(`/bonus/${userData.telegramId}`)
			const { energy, bonusClaimed } = response.data
			setCurrentEnergy(energy)
			setBonusClaimed(bonusClaimed)
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
					{timeRemaining ? formatTime(timeRemaining) : '00:00:00'}
				</div>
			)}
		</div>
	)
}

export default GetBonus
