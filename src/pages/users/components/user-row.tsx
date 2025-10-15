import styled from 'styled-components'
import { Icon } from '../../../components/icon'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { PROP_TYPE } from '../../../constants'
import { request } from '../../../utils'


const Select = styled.select`
	width: 100%;
`

const UserRowContainer = ({
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
		request(`/api/users/${userId}`, 'PATCH', {roleId: newUserRole}).then(() => {
			setInitialRole(newUserRole)
		})
	}

	const isSaveButtonDisabled = selectedRole === initialRole

	return (
		<div className="flex between items-center">
			<div className={className}>
				<div>{login}</div>
				<div>{registeredAt}</div>
				<div className="flex">
					<Select value={selectedRole} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</Select>
					<Icon
						margin="0 15px"
						id="fa-floppy-o"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRole)}
					/>
				</div>
			</div>
			<Icon
				margin="0 11px"
				disabled={isDeleting}
				onClick={onUserRemove}
				id="fa-trash-o"
			/>
		</div>
	)
}

export const UserRow: any = styled(UserRowContainer)`
	display: grid;
	grid-template-columns: 1fr 1.5fr 1fr;
	border: 1px solid black;
	width: 100%;
	padding: clamp(7px, 0.69vw, 10px) 0 clamp(7px, 0.69vw, 10px) clamp(15px, 1.53vw, 22px);
	align-items: center;
`
UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE.isRequired,
	isDeleting: PropTypes.string.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired
}