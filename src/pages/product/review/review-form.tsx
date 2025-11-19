import { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId, selectUserLogin } from '../../../selectors'
import { request } from '../../../utils'
import { setReview } from '../../../actions'
import { StarRating } from './star-rating'

export const ReviewForm = ({ productId }) => {
	const [reviewValue, setReviewValue] = useState('')
	const userLogin = useSelector(selectUserLogin)
	const dispatch = useDispatch()
	const [rating, setRating] = useState(0)
	const [alert, setAlert] = useState('')

	const onReviewSend = (event) => {
		event.preventDefault()
		if(rating === 0) return setAlert('set the rating')
		const reviewDate = new Date().toISOString().split('T')[0]

		request(`/api/products/${productId}/reviews`, 'POST', {
			userLogin,
			rating,
			reviewValue,
			reviewDate,
		}).then(({ review }) => {
			dispatch(setReview(review))
		})

		setReviewValue('')
		setRating(0)
	}

	return (
		<>
			<StarRating rating={rating} setRating={setRating} />
			{alert && <div>{alert}</div>}
			<form onSubmit={onReviewSend} className={`${styles.reviewForm} flex`}>
				<textarea
					onChange={({ target }) => setReviewValue(target.value)}
					value={reviewValue}
				/>
				<button type="submit">send</button>
			</form>
		</>
	)
}
