import { useEffect, useState } from 'react'
import { checkAccess, request } from '../../utils'
import styles from './styles.module.scss'
import { ROLE } from '../../constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { UserRow } from './user-row'
import { Loader } from '../../components/ui'

export const Users = () => {
	const [isLoading, setIsLoading] = useState(true)
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
				setIsLoading(false)
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
		<>
			{isLoading ? (
				<Loader />
			) : (
				<section className={`${styles.users} container`}>
					<h2>users</h2>
					<div className={styles.table}>
						<div className={styles.table__header}>
							<div>login</div>
							<div>registered at</div>
							<div>role</div>
						</div>
						<div className={styles.table__body}>
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
				</section>
			)}
		</>
	)
}
