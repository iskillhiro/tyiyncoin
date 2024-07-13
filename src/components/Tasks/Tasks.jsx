import { useNavigate } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Task from './Task'
import style from './Tasks.module.css'
const tg = window.Telegram.WebApp

function Tasks() {
	const tasks = [
		{
			title: 'Подпишись на канал',
			link: 'https://t.me/tyiyncoin',
			reward: '1',
		},
		{
			title: 'Приведи 3 друзей',
			link: 'https://t.me/share/',
			reward: '3',
		},
	]
	const navigate = useNavigate()
	const backButton = tg.BackButton

	backButton.onClick(() => {
		navigate('/')
	})

	backButton.show()
	return (
		<div className='container'>
			<h1 className={style.title}>Задания</h1>
			<Navigation />
			<div className={style.tasksList}>
				{tasks.map((task, index) => (
					<Task
						key={index}
						title={task.title}
						link={task.link}
						reward={task.reward}
					/>
				))}
			</div>
		</div>
	)
}

export default Tasks
