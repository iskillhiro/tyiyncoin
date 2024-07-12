import Navigation from '../Navigation/Navigation'
import Counter from './Counter/Counter'
import style from './Main.module.css'
import TapZone from './TapZone/TapZone'
function Main() {
	return (
		<div className='container'>
			<h1 className={style.title}>Майнинг TyiynCoin</h1>
			<Counter />
			<TapZone />
			<Navigation />
		</div>
	)
}

export default Main
