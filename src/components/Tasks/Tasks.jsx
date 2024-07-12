import Navigation from '../Navigation/Navigation'
import Task from './Task'
import style from './Tasks.module.css'

function Tasks() {
	const tasks = [
		{
			title: 'Подпишись на канал',
			link: 'https://t.me/tyiyncoin',
			reward: '1 монета',
		},
	]

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
