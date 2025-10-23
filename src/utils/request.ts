export const request = (url, method = 'GET', data: object | undefined = undefined) => {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then(async (res) => {

		if (!res.ok) {
			const error = await res.json()
			throw new Error(error.message || `API error with status ${res.status}`)
		}

		return res.json()
	})
}
