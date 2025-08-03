import styled from 'styled-components'

const IconeContainer = ({ className, id }) => (
    <div className={className}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
)

export const Icon: any = styled(IconeContainer)`
    font-size: ${({size = '24px'}) => size};
    margin: ${({margin = '0'}) => margin};
`
