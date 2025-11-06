import { useDispatch, useSelector } from 'react-redux'
import { addToCartAsync } from '../../../actions'
import styles from './styles.module.scss'
import { selectUserId } from '../../../selectors/select-user-id'

export const Cart = ({ productDataAndSize }) => {
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)

	const addToCart =  () => {
		dispatch(addToCartAsync(userId, productDataAndSize))
	}

	return (
		<button className={styles.iconButton} onClick={addToCart}>
			<img src="/assets/icons/cart.svg" alt="cart" />
		</button>
	)
}
