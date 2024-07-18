import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosDB from '../../utils/axiosDB'
import Navigation from '../Navigation/Navigation'
import Task from './Task'
import style from './Tasks.module.css'
const tg = window.Telegram.WebApp

function Tasks({ telegramId = '1145622789' }) {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosDB.get(`/user/${telegramId}`)
				const user = response.data
				if (user) {
					setTasks(user.tasks)
				}
			} catch (error) {
				console.error('Error fetching user:', error)
			}
		}

		fetchUser()
	}, [telegramId])

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
					<Task key={index} task={task} telegramId={telegramId} />
				))}
			</div>
		</div>
	)
}

export default Tasks
