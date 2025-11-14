import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useResetForm = (reset) => {
	const wasLogout = useSelector((state) => state.app.wasLogout)

	useEffect(() => {
		if (wasLogout) reset()
	}, [wasLogout, reset])
}
