import { useEffect, useState } from "react"
import { fetchCombineProductsId, fetchProducts } from "../bff/operations"

export const useGetCombineProducts = () => {
	const [products, setProducts] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetchCombineProductsId()
		fetchProducts().then(({ res: loadedProducts, error: errorMessage }) =>
			errorMessage ? setError(errorMessage) : setProducts(loadedProducts),
		)
	}, [])

	return {
		products,
		error,
	}
}