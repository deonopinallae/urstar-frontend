import {ACTION_TYPE} from './action-types'

export const setRoles = (roles) => ({
    type: ACTION_TYPE.SET_ROLES,
    payload: roles
})
