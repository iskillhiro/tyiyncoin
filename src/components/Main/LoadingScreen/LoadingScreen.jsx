import { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'

function LoadingScreen() {
	const [loadingImage, setLoadingImage] = useState(null)

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await fetch('/images/loading-image.jpg')
				if (response.ok) {
					setLoadingImage('/images/loading-image.jpg')
				}
			} catch (error) {
				console.error('Error fetching loading image:', error)
			}
		}

		fetchImage()
	}, [])

	return (
		<div className={styles.loadingScreen}>
			{loadingImage ? (
				<img
					src={loadingImage}
					alt='Loading...'
					className={styles.loadingImage}
				/>
			) : (
				<img
					className={styles.loadingImage}
					alt='Loading...'
					src='/public/tap.jpeg'
				></img>
			)}
		</div>
	)
}

export default LoadingScreen
