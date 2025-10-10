import styles from './styles.module.scss'

export const Review = ({ review: { id, userName, data, text, rating } }) => {
	return (
		<div className={`${styles.review}`}>
			<div className="flex items-center justify-between">
				<div className={`${styles.review__userName}`}>{userName}</div>
				<div className={`${styles.review__data}`}>{data}</div>
			</div>
			<div className={`${styles.review__text}`}>{text}</div>
			<div className={`${styles.review__rating}`}>{rating}</div>
		</div>
	)
}
