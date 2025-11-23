import styles from './styles.module.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLogin } from '../../../selectors'
import { request } from '../../../utils'
import { setReview } from '../../../actions'
import { StarRating } from './star-rating'

export const ReviewForm = ({ id: productId }) => {
	const [reviewValue, setReviewValue] = useState('')
	const userLogin = useSelector(selectUserLogin)
	const dispatch = useDispatch()
	const [rating, setRating] = useState(0)
	const [alert, setAlert] = useState('')

	const onReviewSend = (event) => {
		event.preventDefault()
		if (rating === 0) {
			setAlert('set the rating')
			return
		}
		if (reviewValue === '') {
			setAlert('write a review')
			return
		}
		const reviewDate = new Date().toISOString().split('T')[0]

		request(`/api/products/${productId}/reviews`, 'POST', {
			userLogin,
			rating,
			reviewValue: reviewValue.trim(),
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
