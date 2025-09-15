import { getProducts } from '../api'

export const fetchProducts = async () => {
	try {
		const responce = await getProducts()
		if (!responce.ok) {
			throw new Error('products not found')
		}
		const loadedProducts = await responce.json()
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
