import { ACTION_TYPE } from "./action-types";

export const addToCombiner = (combinerProducts) => ({
    type: ACTION_TYPE.ADD_TO_COMBINER,
    payload: combinerProducts
})