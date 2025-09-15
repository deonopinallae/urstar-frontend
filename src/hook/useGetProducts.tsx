import { useEffect, useState } from "react"
import { fetchProducts } from "../bff/operations"

export const useGetProducts = () => {
	const [products, setProducts] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetchProducts().then(({ res: loadedProducts, error: errorMessage }) =>
			errorMessage ? setError(errorMessage) : setProducts(loadedProducts),
		)
	}, [])

	return {
		products,
		error,
	}
}