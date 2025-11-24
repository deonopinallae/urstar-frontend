import { API_URL } from "../constants"

export const request = async (
	url: string,
	method?: string,
	data?: any,
	isFormData?: boolean,
) => {
	const headers: Record<string, string> = {}

	if (!isFormData) headers['content-type'] = 'application/json'

	const res = await fetch(`${API_URL}${url}`, {
		method: method || 'GET',
		credentials: 'include',
		headers,
		body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
	})

	const result = await res.json()
	if (!res.ok) {
		console.error('request failed:', result)
		throw new Error(result.error || 'request failed')
	}

	return result
}
