import { request } from "../utils"
import { deleteOutfit } from "./delete-outfit"

export const deleteOutfitAsync = (userId, outfitId) => (dispatch) => {
	request(`/api/users/${userId}/outfits/${outfitId}`, 'DELETE').then(({ outfitId }) => {
		dispatch(deleteOutfit(outfitId))
	})
}
