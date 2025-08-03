import styled from 'styled-components'
import { Icon } from '../../icon'
import { Link, useNavigate } from 'react-router-dom'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
    gap: 20px;
`

const Button = styled(Link)`
    fonst-size: 18px;
    background-color: #0001;
    padding: 0.69vw 2.08vw;
	border:	#000 1px solid;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	return (
		<div className={className}>
			<RightAligned>
				<Button to="/login">войти</Button>
			</RightAligned>
			<RightAligned>
				<button onClick={() => navigate(-1)}><Icon id="fa-backward" /></button>
				<Link to="/post"><Icon id="fa-file-text-o"/></Link>
				<Link to="/users"><Icon id="fa-users"/></Link>
			</RightAligned>
		</div>
	)
}

export const ControlPanel: any = styled(ControlPanelContainer)`
    	display: flex;
        flex-direction: column;
        gap: 10px
`
