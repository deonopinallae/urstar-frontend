import { useEffect, useState } from 'react'
import { checkAccess, request } from '../../utils'
import styles from './styles.module.scss'
import { ROLE } from '../../constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { UserRow } from './user-row'

export const Users = () => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const userRole = useSelector(selectUserRole)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}
		Promise.all([request('/api/users'), request('/api/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}
				setUsers(usersRes.data)
				setRoles(rolesRes.data)
			},
		)
	}, [shouldUpdateUserList, userRole])

	const onUserRemove = async (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}
		setIsDeleting(true)
		await request(`/api/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
		setIsDeleting(false)
	}

	return (
		<div className={`${styles.users} container`}>
            <h2>users</h2>
			<div className="table">
				<div className="table-header">
					<div>login</div>
					<div>registered at</div>
					<div>role</div>
				</div>
				<div className="table-body">
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={login}
							{...{ id, login, registeredAt, roleId, isDeleting }}
							roles={roles.filter(
								({ id: roleId }) => Number(roleId) !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
