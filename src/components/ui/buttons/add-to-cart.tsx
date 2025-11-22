import { useDispatch, useSelector } from 'react-redux'
import { addToCartAsync, removeFromCartAsync } from '../../../actions'
import styles from './styles.module.scss'
import { selectUserId } from '../../../selectors/select-user-id'
import { selectUserCart } from '../../../selectors/select-user-cart'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../alert/alert'

export const AddToCart = ({ productData, selectedSize }) => {
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const cart = useSelector(selectUserCart)
	const [isAdded, setIsAdded] = useState(false)
	const [alert, setAlert] = useState('')
	const navigate = useNavigate()

	const currentProduct = { product: productData.product.id, size: selectedSize }

	useEffect(() => {
		setIsAdded(
			cart.some(
				(el) =>
					el.id === currentProduct.product &&
					el.size === currentProduct.size,
			),
		)
	}, [selectedSize, cart])

	const addToCart = () => {
		if (!userId) navigate('/login')
		if (!selectedSize) {
			setAlert('choose a size')
			setTimeout(() => {
				setAlert('')
			}, 3000)
			return
		}
		dispatch(addToCartAsync(userId, currentProduct))
	}

	return (
		<button className={styles.iconButton} onClick={addToCart}>
			{alert && <Alert text={alert} />}
			{isAdded ? 'in cart' : <img src="/assets/icons/cart.svg" alt="cart" />}
		</button>
	)
}
