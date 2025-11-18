import { ACTION_TYPE } from "./action-types";

export const removeFromFavorites = (productId) => ({
    type: ACTION_TYPE.REMOVE_FROM_FAVORITES,
    payload: productId
})