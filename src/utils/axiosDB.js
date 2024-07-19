import axios from 'axios'

const axiosDB = axios.create({
	baseURL: 'https://pinocchionode-1.onrender.com/api',
})

export default axiosDB
