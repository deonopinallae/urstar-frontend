import { request } from '../../utils'
import styles from './styles.module.scss'
import { useState } from 'react'

export const UserRow = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	isDeleting,
	roles,
	onUserRemove,
}) => {
	const [selectedRole, setSelectedRole] = useState(userRoleId)
	const [initialRole, setInitialRole] = useState(userRoleId)

	const onRoleChange = ({ target }) => {
		setSelectedRole(Number(target.value))
	}
	const onRoleSave = (userId, newUserRole) => {
		request(`/api/users/${userId}`, 'PATCH', { roleId: newUserRole }).then(() => {
			setInitialRole(newUserRole)
		})
	}

	const isSaveButtonDisabled = selectedRole === initialRole

	return (
		<div className="flex between items-center">
			<div className={`${styles.userRow__info} flex justify-between`}>
				<div>{login}</div>
				<div>{registeredAt}</div>
				<div className="flex">
					<select value={selectedRole} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<button
						className={`${styles.userRow__buttons}`}
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRole)}
					>
						save
					</button>
				</div>
			</div>
			<button
				className={`${styles.userRow__buttons}`}
				disabled={isDeleting}
				onClick={onUserRemove}
			>
				delete
			</button>
		</div>
	)
}
