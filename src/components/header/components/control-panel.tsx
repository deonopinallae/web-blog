import styled from 'styled-components'
import { Icon } from '../../icon'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../selectors'
import { ROLE } from '../../../constants'
import { logout } from '../../../actions/logout'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: clamp(13px, 1.39vw, 20px);
`
const LoginDiv = styled.div`
	display: flex;
	gap: clamp(13px, 1.39vw, 20px);
	align-items: center;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const session = useSelector(selectUserSession)

	const onLogout = () => {
		dispatch(logout(session))
		sessionStorage.removeItem('userData')
	}

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">войти</Link>
					</Button>
				) : (
					<LoginDiv>
						<div>{login}</div>
							<Icon onClick={onLogout} id="fa-sign-out" />
					</LoginDiv>
				)}
			</RightAligned>
			<RightAligned>
				<Icon onClick={() => navigate(-1)} id="fa-backward" />
				<Link to="/post">
					<Icon id="fa-file-text-o" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" />
				</Link>
			</RightAligned>
		</div>
	)
}

export const ControlPanel: any = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	gap: 10px;
`
