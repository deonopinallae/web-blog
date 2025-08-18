import styled from 'styled-components'

const IconeContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
)

export const Icon: any = styled(IconeContainer)`
    cursor: pointer;
    font-size: ${({ size = 'clamp(18px, 1.67vw, 24px)' }) => size};
    margin: ${({ margin = '0' }) => margin};
    color: ${({ disabled }) => (disabled ? '#ccc' : '#000')}

    &:hover{
    cursor: ${({ inactive }) => (inactive ? 'pointer' : 'default')}
    }
`
