import { useState } from "react"

export const useSetAlert = (message, time) => {
	const [alert, setAlert] = useState('')
	setAlert(message)
	setTimeout(() => setAlert(''), time)
	return
}
