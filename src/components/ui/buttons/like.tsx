import styles from './styles.module.scss'

export const Like = ({productId}) => {
	const addToFavorite = () => {}

	return (
		<button className={styles.iconButton} onClick={addToFavorite}>
			<img src="/assets/icons/like.svg" alt="like" />
		</button>
	)
}
