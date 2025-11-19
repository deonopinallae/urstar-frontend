import styles from './styles.module.scss'
import { StarRating } from './star-rating'
import { checkAccess } from '../../../utils'
import { ROLE } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../../selectors'

export const Review = ({
	review: { id: reviewId, author, publishedAt, content, rating },
	removeReview,
}) => {
	const userRole = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<>
			<div className={`${styles.review}`}>
				<div className="flex items-center justify-between">
					<div className={`${styles.review__userName}`}>{author}</div>
					{isAdmin && <button onClick={() => removeReview(reviewId)}>х</button>}
				</div>
				<div className={`${styles.review__text}`}>{content}</div>
				<div className="flex justify-between">
					<StarRating
						rating={rating}
						readOnly={true}
						size={'clamp(13px, 1.39vw, 20px)'}
					/>
					<div className={`${styles.review__data}`}>{publishedAt}</div>
				</div>
			</div>
		</>
	)
}
