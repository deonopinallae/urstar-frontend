import { ACTION_TYPE } from "./action-types";

export const removeFromFavorites = (productData) => ({
    type: ACTION_TYPE.REMOVE_FROM_FAVORITES,
    payload: productData
})