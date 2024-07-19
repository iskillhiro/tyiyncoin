import { useEffect, useState } from 'react'
import axiosDB from '../../utils/axiosDB'
import Navigation from '../Navigation/Navigation'
import Count from './Count/Count'
import Energy from './Energy/Energy'
import GetBonus from './GetBonus/GetBonus'
import Level from './Level/Level'
import LoadingScreen from './LoadingScreen/LoadingScreen'
import TapZone from './TapZone/TapZone'

const tg = window.Telegram.WebApp

function Main() {
	const [userData, setUserData] = useState(null)
	const backButton = tg.BackButton
	const [currentEnergy, setCurrentEnergy] = useState(0)
	const [currentCoins, setCurrentCoins] = useState(0)
	backButton.hide()

	useEffect(() => {
		const getUserData = async () => {
			try {
				// Получаем telegramId из объекта initData
				const telegramId = tg.initDataUnsafe.user.id

				const response = await axiosDB.get(`/user/${telegramId}`)
				const userInfo = response.data
				setUserData(userInfo)
				setCurrentEnergy(userInfo.energy)
				setCurrentCoins(userInfo.coins)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		getUserData()
	}, [])

	if (!userData) {
		return <LoadingScreen />
	}

	console.log('Rendering TapZone with props:', {
		userData,
		setCurrentCoins,
		setCurrentEnergy,
	})

	return (
		<div className='container'>
			<Count currentCoins={currentCoins} />
			<GetBonus
				userData={userData}
				currentEnergy={currentEnergy}
				setCurrentEnergy={setCurrentEnergy}
			/>
			<Level userData={userData} />
			<Energy currentEnergy={currentEnergy} maxEnergy={userData.maxEnergy} />
			<TapZone
				userData={userData}
				setCurrentCoins={setCurrentCoins}
				setCurrentEnergy={setCurrentEnergy}
				currentEnergy={currentEnergy}
			/>
			<Navigation />
		</div>
	)
}

export default Main
