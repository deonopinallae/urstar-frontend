export const StarRating = ({ rating, setRating, readOnly = false, size = 'clamp(33px, 3.47vw, 50px)' }) => {
	const stars = [1, 2, 3, 4, 5]

	return (
		<div className={`flex gap-1 ${readOnly ? '' : 'cursor-pointer'}`}>
			{stars.map((star) => (
				<span
					key={star}
					onClick={
						readOnly
							? undefined
							: () => setRating && setRating(star)
					}
					style={{
						fontSize: size,
						color: star <= rating ? '#facc15' : '#e5e7eb',
						pointerEvents: readOnly ? 'none' : 'auto',
                        textShadow: '0 0 1px black, 0 0 1px black, 0 0 1px black', 
					}}
				>
					★
				</span>
			))}
		</div>
	)
}
