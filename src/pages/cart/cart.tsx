import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { selectProducts, selectUserCart } from '../../selectors'
import { CartCard } from './cart-card'
import { useEffect, useState } from 'react'
import { request } from '../../utils'
import { setProducts } from '../../actions'
import { Loader } from '../../components/ui'

export const Cart = () => {
	const cart = useSelector(selectUserCart)
	const totalPrice = cart.reduce((sum, item) => sum + Number(item.price || 0), 0)
	const dispatch = useDispatch()
	const products = useSelector(selectProducts)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (products.length === 0) {
			request('/api/products').then(({ data: { products } }) => {
				dispatch(setProducts(products))
				setIsLoading(false)
			})
		}
		setIsLoading(false)
	}, [products.length])

	if (isLoading) return <Loader />

	return (
		<div className={`${styles.cart}`}>
			<h2 className={`${styles.cart__title} text-center`}>your cart</h2>
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
