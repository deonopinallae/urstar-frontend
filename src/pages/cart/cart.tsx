import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { selectUserCart } from '../../selectors'
import { CartCard } from './cart-card'

export const Cart = () => {
	const cart = useSelector(selectUserCart)
	const totalPrice = cart.reduce((sum, item) => sum + Number(item.price || 0), 0)

	return (
		<div className={`${styles.cart}`}>
			<h2 className={styles.cart__title}>your cart</h2>
			<div className={styles.cart__products}>
				{cart.length ? (
					cart.map((product) => (
						<CartCard key={product.id + product.size} product={product} />
					))
				) : (
					<p className={styles.cart__empty}>cart is empty</p>
				)}
			</div>
			{cart.length > 0 && (
				<div className={styles.cart__footer}>
					<p className={styles.cart__total}>total: ${totalPrice.toFixed(2)}</p>
					<button className={styles.cart__orderBtn}>order now</button>
				</div>
			)}
		</div>
	)
}
