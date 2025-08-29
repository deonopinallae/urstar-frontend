export const initialState: stateTypes = {

}
export const appReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case '': {
			return { }
		}
		default:
			return state
	}
}

interface stateTypes {

}
