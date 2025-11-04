export const request = (url, method, data) =>
	fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		credentials: 'include',
		body: data ? JSON.stringify(data) : undefined,
	}).then(async (res) => {
		const result = await res.json()
		if (!res.ok) {
			console.error('request failed:', result)
			throw new Error(result.error || 'request failed')
		}
		return result
	})
