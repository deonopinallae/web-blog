import styled from 'styled-components'
import { UserRow } from './components/user-row'
import { useServerRequest } from '../../hooks'
import { useEffect, useState } from 'react'
import { Content } from '../../components'
import { ROLE } from '../../constants'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const requestServer = useServerRequest()

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}
				setUsers(usersRes.res)
				setRoles(rolesRes.res)
			},
		)
	}, [requestServer, shouldUpdateUserList])

	const onUserRemove = async (userId) => {
		setIsDeleting(true)
		await requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
		setIsDeleting(false)
	}

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<h2>пользователи</h2>
				<div className="table">
					<div className="table-header">
						<div>логин</div>
						<div>дата регистрации</div>
						<div>роль</div>
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
			</Content>
		</div>
	)
}
export const Users: any = styled(UsersContainer)`
	margin: 0 auto;
	width: clamp(380px, 39.58vw, 570px);
	& .table-header {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1.3fr;
		padding: clamp(7px, 0.69vw, 10px) 0 clamp(7px, 0.69vw, 10px)
			clamp(15px, 1.53vw, 22px);
	}
	& .table-body {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
`
