import { request } from '../utils'
import { setProductData } from './set-product-data'

export const saveProductAsync =
	(id: string, newProductData: FormData | object) => (dispatch) => {
		if (newProductData instanceof FormData) {
			return fetch(id ? `/api/products/${id}/edit` : '/api/products', {
				method: id ? 'PATCH' : 'POST',
				body: newProductData,
				credentials: 'include',
			})
				.then((res) => res.json())
				.then(({ data }) => {
					dispatch(setProductData(data))
					return data
				})
		}

		return request(
			id ? `/api/products/${id}/edit` : '/api/products',
			id ? 'PATCH' : 'POST',
			newProductData,
		).then(({ data }) => {
			dispatch(setProductData(data))
			return data
		})
	}
