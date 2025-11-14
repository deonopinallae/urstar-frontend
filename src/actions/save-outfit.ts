import { ACTION_TYPE } from "./action-types"

export const saveOutfit = (outfitData) => ({
    type: ACTION_TYPE.SAVE_OUTFIT,
    payload: outfitData
})