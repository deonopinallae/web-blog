import styled from "styled-components"
import PropTypes from 'prop-types'


const ButtonContainer = ({children, className, width, ...props}) => (
    <button className={className} {...props}>
        {children}
    </button>
    
)

export const Button: any = styled(ButtonContainer)`
    font-size: clamp(16px, 1.25vw, 18px);
    background-color: #0001;
    padding: 0.69vw 2.08vw;
	border:	#000 1px solid;
    width: ${({width = '100%'}) => width}
`
Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string
}