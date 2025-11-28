import { useDispatch, useSelector } from 'react-redux'
import { addToCartAsync } from '../../../actions'
import styles from './styles.module.scss'
import { selectUserId } from '../../../selectors/select-user-id'
import { selectUserCart } from '../../../selectors/select-user-cart'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../alert/alert'

export const AddToCart = ({ productData }) => {
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const cart = useSelector(selectUserCart)
	const [isAdded, setIsAdded] = useState(false)
	const [alert, setAlert] = useState('')
	const navigate = useNavigate()

	const currentProduct = { product: productData.product.id, size: productData.size }

	useEffect(() => {
		setIsAdded(
			cart.some(
				(el) =>
					el.id === currentProduct.product && el.size === currentProduct.size,
			),
		)
	}, [productData.size, cart])

	const addToCart = () => {
		if (!userId) navigate('/login')
		if (!productData.size) {
			setAlert('choose a size')
			setTimeout(() => {
				setAlert('')
			}, 3000)
			return
		}
		const adding = dispatch(addToCartAsync(userId, currentProduct))
		if (adding) {
			setAlert(`added to cart`)
			setTimeout(() => {
				setAlert('')
			}, 3000)
		}
	}

	return (
		<>
			{alert && <Alert text={alert} />}
			<button className={styles.iconButton} onClick={addToCart}>
				{isAdded ? 'in cart' : <img src="/assets/icons/cart.svg" alt="cart" />}
			</button>
		</>
	)
}
