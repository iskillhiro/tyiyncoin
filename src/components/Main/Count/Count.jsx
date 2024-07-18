import style from './Count.module.css'

const Count = ({ currentCoins }) => {
	// Round the currentCoins to 2 decimal places and convert to a number
	const roundedCoins = Number(currentCoins.toFixed(2))

	return (
		<div className={style.counter}>
			<div className={style.count}>
				<img src='/coin.svg' alt='' />
				{roundedCoins}
			</div>
		</div>
	)
}

export default Count
