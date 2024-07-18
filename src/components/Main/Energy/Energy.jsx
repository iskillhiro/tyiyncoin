import style from './Energy.module.css'
const Energy = ({ currentEnergy, maxEnergy }) => {
	return (
		<div className={style.counter}>
			<div className={style.count}>
				⚡{currentEnergy}/{maxEnergy}
			</div>
		</div>
	)
}

export default Energy
