import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addToCombinerAsync, removeFromCombinerAsync } from '../../../actions'
import { selectCombinerProducts, selectUserId } from '../../../selectors'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddToCombinerButton = ({ productId }) => {
	const userId = useSelector(selectUserId)
	const combinerProducts = useSelector(selectCombinerProducts)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isAdded, setIsAdded] = useState(
		combinerProducts.some((p) => p.id === productId),
	)

	useEffect(() => {
		setIsAdded(combinerProducts.some((p) => p.id === productId))
	}, [combinerProducts])

	const addToCombiner = () => {
		if (!userId) navigate('/login')
		if (isAdded) {
			return
		}
		dispatch(addToCombinerAsync(userId, productId))
	}

	const removeFromCombine = () => {
		dispatch(removeFromCombinerAsync(userId, productId))
	}

	return (
		<>
			<button
				className={styles.iconButton}
				onClick={isAdded ? removeFromCombine : addToCombiner}
			>
				{isAdded ? 'no combine' : 'combine'}
			</button>
		</>
	)
}
