import { ACTION_TYPE } from "./action-types";

export const addToFavorites = (productData) => ({
    type: ACTION_TYPE.ADD_TO_FAVORITES,
    payload: productData
})