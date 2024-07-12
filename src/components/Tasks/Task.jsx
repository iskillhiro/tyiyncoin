import { Link } from 'react-router-dom'
import style from './Tasks.module.css'
function Task({ title, link, reward }) {
	return (
		<Link to={link} className={style.task}>
			<h3 className={style.taskTitle}>{title}</h3>
			<p className={style.taskReward}>Награда: {reward}</p>
		</Link>
	)
}

export default Task
