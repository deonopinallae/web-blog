import styled from 'styled-components'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const InputContainer = forwardRef(({ className, ...props }, ref) => <input className={className} {...props} ref={ref} />)

export const Input: any = styled(InputContainer)`
	padding: clamp(7px, 0.69vw, 10px);
	border: 1px solid #000;
	font-size: clamp(16px, 1.25vw, 18px);
`
Input.propTypes = {
	width: PropTypes.string	
}