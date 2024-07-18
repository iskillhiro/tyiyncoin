import style from './Energy.module.css'
const Energy = ({ currentEnergy }) => {
	return (
		<div className={style.counter}>
			<div className={style.count}>⚡{currentEnergy}/500</div>
		</div>
	)
}

export default Energy
