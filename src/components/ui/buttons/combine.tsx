import styles from './styles.module.scss'

export const Combine = ({ productId }) => {
	const addToCombine = () => {}

	return (
		<button className={styles.button} onClick={addToCombine}>
			combine
		</button>
	)
}
