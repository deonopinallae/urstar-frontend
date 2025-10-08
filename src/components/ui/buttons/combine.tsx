import styles from './styles.module.scss'

export const Combine = ({ productId }) => {
	const addToCombine = () => {}

	return (
		<button className={styles.iconButton} onClick={addToCombine}>
			combine
		</button>
	)
}
