import Navigation from '../Navigation/Navigation'
import Count from './Count/Count'
import Energy from './Energy/Energy'
import Level from './Level/Level'
import TapZone from './TapZone/TapZone'
const tg = window.Telegram.WebApp
function Main() {
	const backButton = tg.BackButton
	backButton.hide()
	return (
		<div className='container'>
			<Count />
			<Level />
			<Energy />
			<TapZone />
			<Navigation />
		</div>
	)
}

export default Main
