import { Link } from 'react-router-dom'
import axiosDB from '../../utils/axiosDB'
import style from './Tasks.module.css'

function Task({ task, telegramId }) {
	const updateTaskStatus = async () => {
		try {
			await axiosDB.post('/task/updateStatus', {
				taskId: task._id,
				telegramId,
			})
		} catch (error) {
			console.error('Error updating task status:', error)
		}
	}

	let rewardElement
	if (task.executionStage === 0) {
		rewardElement = (
			<span>
				+{task.reward}
				<img src='./coin.svg' alt='' />
			</span>
		)
	} else if (task.executionStage === 1) {
		rewardElement = <img src='/timer.svg' alt='' />
	} else {
		rewardElement = <img src='/success.svg' alt='' />
	}

	return (
		<Link onClick={updateTaskStatus} to={task.link} className={style.task}>
			<h3 className={style.taskTitle}>{task.name}</h3>
			<p className={style.taskReward}>{rewardElement}</p>
		</Link>
	)
}

export default Task
