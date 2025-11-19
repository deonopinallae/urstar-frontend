import { ACTION_TYPE } from "./action-types"

export const deleteReview = (reviewId) => ({
    type: ACTION_TYPE.DELETE_REVIEW,
    payload: reviewId
})