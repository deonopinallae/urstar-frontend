import { useDispatch, useSelector } from 'react-redux'
import { addToCombinerAsync } from '../../../actions/add-to-combiner-async'
import styles from './styles.module.scss'
import { selectUserId } from '../../../selectors'
import { useEffect, useState } from 'react'
import { request } from '../../../utils'
import { useNavigate } from 'react-router-dom'

export const AddToCombinerButton = ({ productId }) => {
	const userId = useSelector(selectUserId)
	const [combinerProducts, setCombinerProducts] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		request(`/api/users/${userId}/combiner`).then(({ data }) => {
			setCombinerProducts(data)
		})
	}, [combinerProducts])
	const dispatch = useDispatch()
	const alreadyAdded = combinerProducts.some((p) => p._id === productId)

	const addToCombiner = () => {
		if (!userId) navigate('/login')
		if (alreadyAdded) {
			return
		}
		dispatch(addToCombinerAsync(userId, productId))
	}

	return (
		<>
				<button
					disabled={alreadyAdded}
					className={styles.iconButton}
					onClick={addToCombiner}
				>
					{alreadyAdded ? 'in combiner' : 'combine'}
				</button>
		</>
	)
}
