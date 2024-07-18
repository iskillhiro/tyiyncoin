import style from './Count.module.css'
const Count = ({ currentCoins }) => {
	return (
		<div className={style.counter}>
			<div className={style.count}>
				<img src='/coin.svg' alt='' />
				{currentCoins}
			</div>
		</div>
	)
}

export default Count
