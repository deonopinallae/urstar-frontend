import { useDispatch, useSelector } from 'react-redux'
import { addToCombinerAsync } from '../../../actions/add-to-combiner-async'
import styles from './styles.module.scss'
import { selectUserId } from '../../../selectors/select-user-id'
import { selectUser, selectCombinerProducts } from '../../../selectors'

export const AddToCombinerButton = ({ productData }) => {
	const userId = useSelector(selectUserId)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const combinerProducts = useSelector(selectCombinerProducts)

	const alreadyAdded = combinerProducts?.some(
		(el) => String(el._id) === String(productData.id)
	)

	const addToCombiner = () => {
		if (alreadyAdded) {
			return
		}
		dispatch(addToCombinerAsync(userId, productData))
	}

	return (
		<button className={styles.iconButton} onClick={addToCombiner}>
			{alreadyAdded ? 'already added' : 'add to combiner'}
		</button>
	)
}
