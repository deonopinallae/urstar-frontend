import { getProducts } from '../api'

export const fetchProducts = async () => {
		const products = await getProducts()
			console.log(products)

		if (products === 'error') {
			return {
				error: 'products was not loaded',
				res: [],
			}
		}
	
		return {
			error: null,
			res: products,
		}
	
}
