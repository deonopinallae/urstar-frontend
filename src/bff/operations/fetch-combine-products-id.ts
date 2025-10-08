import { getCombineProductsId, getProducts } from '../api'

export const fetchCombineProductsId = async () => {
	try {
		const responce1 = await getProducts()
		const responce2 = await getCombineProductsId()
		if (!responce1.ok && !responce2.ok) {
			throw new Error('products not found')
		}
		const loadedProducts = await responce1.json()
		const loadedProductsId = await responce2.json()

		// console.log(loadedProducts)
		console.log(loadedProductsId)

		console.log(loadedProductsId.forEach(element => {
			loadedProducts.find(el => {element === el.id})
		}))

		return {
			error: null,
			res: loadedProductsId,
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
