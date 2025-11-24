export const request = async (
	url: string,
	method?: string,
	data?: any,
	isFormData?: boolean,
) => {
	const headers: Record<string, string> = {}

	if (!isFormData) headers['content-type'] = 'application/json'

	const token = localStorage.getItem('token')
	if (token) headers['Authorization'] = `Bearer ${token}`

	const res = await fetch(url, {
		method: method || 'GET',
		headers,
		body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
	})

	const result = await res.json()
	if (!res.ok) throw new Error(result.error || 'request failed')
	return result
}
