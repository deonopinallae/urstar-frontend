import { ACTION_TYPE } from "./action-types";

export const addToCombiner = (product) => ({
    type: ACTION_TYPE.ADD_TO_COMBINER,
    payload: product
})