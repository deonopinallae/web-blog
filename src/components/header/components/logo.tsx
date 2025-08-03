import styled from 'styled-components'
import { Icon } from '../..'
import { Link } from 'react-router-dom'

const LargeText = styled.div`
	font-size: 3.33vw;
	font-weight: 300;
    line-height: 3.33vw;
`

const SmallText = styled.div`
	font-size: clamp(14px, 1.11vw, 16px);
	font-weight: bold;
`


const LogoContainer = ({ className }) => (
	<Link to="/" className={className}>
		<Icon id="fa-code" size="clamp(41px, 4.31vw, 62px)" margin="0 10px 0 0"/>
		<div className='flex column center'>
			<LargeText>web</LargeText>
			<SmallText>blog</SmallText>
		</div>
	</Link>
)
export const Logo: any = styled(LogoContainer)`
	display: flex;
`
