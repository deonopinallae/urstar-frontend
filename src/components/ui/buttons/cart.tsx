import styles from './styles.module.scss'

export const Cart = ({productId}) => {
	const addToCart = () => {}

	return (
		<button className={styles.button} onClick={addToCart}>
			<img src="src/assets/icons/cart.svg" alt="cart" />
		</button>
	)
}
