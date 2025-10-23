import { request } from '../utils'
import { ACTION_TYPE } from './action-types'

export const logout = () => {
     request('/api/logout', 'POST')
	return { type: ACTION_TYPE.LOGOUT }
}
