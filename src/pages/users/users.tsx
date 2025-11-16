import { useEffect, useState } from 'react'
import { checkAccess, request } from '../../utils'
import styles from './styles.module.scss'
import { ROLE } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole, selectUsers, selectRoles } from '../../selectors'
import { UserRow } from './user-row'
import { Loader } from '../../components/ui'
import { setRoles, setUsers } from '../../actions'

export const Users = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const userRole = useSelector(selectUserRole)
	const users = useSelector(selectUsers)
	const roles = useSelector(selectRoles)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}
		if (users.length > 0 && roles.length > 0) {
			setIsLoading(false)
			return
		}
		if (users.length === 0 && roles.length === 0)
			Promise.all([request('/api/users'), request('/api/users/roles')])
				.then(([usersRes, rolesRes]) => {
					console.log(usersRes.data)
					if (usersRes.error || rolesRes.error) {
						setErrorMessage(usersRes.error || rolesRes.error)
						return
					}
					dispatch(setUsers(usersRes.data))
					dispatch(setRoles(rolesRes.data))
					setIsLoading(false)
				})
				.catch((error) => {
					setErrorMessage(error)
					setIsLoading(false)
				})
	}, [dispatch, userRole, users.length, roles.length])

	const onUserRemove = async (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}
		setIsDeleting(true)
		await request(`/api/users/${userId}`, 'DELETE').then(() => {
			dispatch(setUsers(users.filter((u) => u.id !== userId)))
		})
		setIsDeleting(false)
	}

	if (isLoading) return <Loader />
	if (errorMessage) return <div>{errorMessage}</div>

	return (
		<>
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
		</>
	)
}
