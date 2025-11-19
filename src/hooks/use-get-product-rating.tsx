export const useGetProductRating = (reviews) => {
	if (reviews.length === 0) return 'no rating yet'
	const sumOfReviewsRating = reviews.reduce((acc, curr) => acc + Number(curr.rating), 0)
	const rating = Number((sumOfReviewsRating / reviews.length).toFixed(1))
	return rating
}
