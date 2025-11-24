import { request } from '../utils'
import { setProductData } from './set-product-data'

export const saveProductAsync =
	(id: string, newProductData: FormData | object) => async (dispatch) => {
		try {
			let data

			if (newProductData instanceof FormData) {
				const res = await fetch(
					id ? `/api/products/${id}/edit` : '/api/products',
					{
						method: id ? 'PATCH' : 'POST',
						body: newProductData,
						credentials: 'include',
					},
				)

				const text = await res.text()
				data = text ? JSON.parse(text) : {} 

				if (!res.ok) throw new Error(data.error || 'request failed')
			} else {
				data = await request(
					id ? `/api/products/${id}/edit` : '/api/products',
					id ? 'PATCH' : 'POST',
					newProductData,
				)
			}

			dispatch(setProductData(data.data || data))
			return data.data || data
		} catch (err) {
			console.error('Ошибка при сохранении товара:', err)
			throw err
		}
	}
