import style from './Count.module.css'
const Count = () => {
	return (
		<div className={style.counter}>
			<div className={style.count}>
				<img src='/coin.svg' alt='' />
				1.03
			</div>
		</div>
	)
}

export default Count
