import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Main = () => {
	return (
		<main className={`${styles.main} flex justify-center item-center container relative`}>
			<div className={`${styles.main__content} relative`}>
				<Link to='/catalog' className={`${styles.main__button} relative`}>
					to CATalog...
				</Link>
				<img
					className={`${styles.main__image} relative`}
					src="src/assets/model.png"
					alt=""
				/>
			</div>
		</main>
	)
}
