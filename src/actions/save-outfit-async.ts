import { request } from "../utils"
import { saveOutfit } from "./save-outfit"


export const saveOutfitAsync =  (userId, outfitData) => async(dispatch) => {
	request(`/api/users/${userId}/outfits`, 'POST', {outfitData}
	).then(({ outfit }) => {
		dispatch(saveOutfit(outfit))
	})
}
