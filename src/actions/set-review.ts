import { ACTION_TYPE } from "./action-types"

export const setReview = (review) => ({
    type: ACTION_TYPE.SET_REVIEW,
    payload: review
})
