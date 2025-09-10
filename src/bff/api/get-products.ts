export const getProducts = async () => {
	try {
		const responce = await fetch('http://localhost:3000/products')
		if (!responce.ok) {
			throw new Error('products not found')
		}
		const loadedProducts = await response.json()
		return {
			error: null,
			res: loadedProducts,
		}
	} catch (error) {
		let errorMessage = 'server error'
		if (error.message === 'products not found') {
			errorMessage = 'products not found'
		}
		return {
			error: errorMessage,
			res: null,
		}
	}
}
