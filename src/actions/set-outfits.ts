import { ACTION_TYPE } from './action-types'

export const setOutfits = (outfits) => ({
    type: ACTION_TYPE.SET_OUTFITS,
    payload: outfits
})
