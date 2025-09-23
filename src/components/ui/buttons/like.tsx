import styles from './styles.module.scss'

export const Like = ({productId}) => {
	const addToFavorite = () => {}

	return (
		<button className={styles.button} onClick={addToFavorite}>
			<img src="src/assets/icons/like.svg" alt="like" />
		</button>
	)
}
