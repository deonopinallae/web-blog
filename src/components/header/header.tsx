import styled from 'styled-components'
import { Logo, ControlPanel } from './components'

const Discription = styled.div`
	font-style: italic;
`

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Discription>
				веб-технологии <br />
				написание кода <br />
				разбор ошибок
			</Discription>
			<ControlPanel />
		</header>
	)
}

export const Header: any = styled(HeaderContainer)`
	padding: clamp(13px, 1.39vw, 20px) clamp(27px, 2.78vw, 40px);
	box-shadow: 0px -2px 17px #000;
	position: fixed;
	top: 0;
	width: clamp(300px, 69.44vw, 1000px);
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
