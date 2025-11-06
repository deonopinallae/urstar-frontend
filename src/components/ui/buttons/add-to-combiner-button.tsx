import { useDispatch, useSelector } from 'react-redux'
import { addToCombinerAsync } from '../../../actions/add-to-combiner-async'
import styles from './styles.module.scss'
import { selectUserId } from '../../../selectors'
import { selectUser, selectCombinerProducts } from '../../../selectors'

export const AddToCombinerButton = ({ productId }) => {
	const userId = useSelector(selectUserId)
	const user = useSelector(selectUser)
	const combinerProducts = user.combinerProducts
	const dispatch = useDispatch()
	const alreadyAdded = combinerProducts.some(
		(p) => p._id === productId,
	)

	const addToCombiner = () => {
		if(alreadyAdded){
			return
		}
		dispatch(addToCombinerAsync(userId, productId))
	}

	return (
		<button disabled={alreadyAdded} className={styles.iconButton} onClick={addToCombiner}>
			{alreadyAdded ? 'already added' : 'add to combiner'}
		</button>
	)
}
