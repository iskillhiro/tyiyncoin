import { useNavigate } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Task from './Task'
import style from './Tasks.module.css'
const tg = window.Telegram.WebApp

function Tasks() {
	// {
	// 	title: 'Приведи 3 друзей',
	// 	link: `https://t.me/share/url?url=https://t.me/TyiynCoin_bot?start=${telegramId}&text=Join me on Pinocchio and let's earn together! Use my invite link to join the fun 🚀`,
	// 	reward: '3',
	// },
	const tasks = [
		{
			title: 'Подпишись на канал',
			link: 'https://t.me/tyiyncoin',
			reward: '1',
		},
		{
			title: 'Приведи 3 друзей',
			link: `https://t.me/share/url?url=https://t.me/TyiynCoin_bot?&text=Присоединяйся ко мне в TyiynCoin и давай зарабатывать вместе! Используй мою ссылку для приглашения, чтобы получить крутые бонусы 🚀`,
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
