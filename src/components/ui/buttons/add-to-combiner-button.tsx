import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addToCombinerAsync } from '../../../actions'
import { selectCombinerProducts, selectUserId } from '../../../selectors'
import { useEffect, useState } from 'react'
import { request } from '../../../utils'
import { useNavigate } from 'react-router-dom'

export const AddToCombinerButton = ({ productId }) => {
	const userId = useSelector(selectUserId)
	const combinerProducts = useSelector(selectCombinerProducts)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isAdded, setIsAdded] = useState(combinerProducts.some((p) => p._id === productId))

	useEffect(() => setIsAdded(combinerProducts.some((p) => p._id === productId)), [combinerProducts])

	const addToCombiner = () => {
		if (!userId) navigate('/login')
		if (isAdded) {
			return
		}
		dispatch(addToCombinerAsync(userId, productId))
	}

	return (
		<>
				<button
					disabled={isAdded}
					className={styles.iconButton}
					onClick={addToCombiner}
				>
					{isAdded ? 'in combiner' : 'combine'}
				</button>
		</>
	)
}
