import styles from './styles.module.scss'

export const Cart = ({productId}) => {
	const addToCart = () => {}

	return (
		<button className={styles.iconButton} onClick={addToCart}>
			<img src="/assets/icons/cart.svg" alt="cart" />
		</button>
	)
}
