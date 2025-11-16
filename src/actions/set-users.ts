import {ACTION_TYPE} from './action-types'

export const setUsers = (users) => ({
    type: ACTION_TYPE.SET_USERS,
    payload: users
})
