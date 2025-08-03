import styled from 'styled-components'

const IconeContainer = ({ className, id }) => (
    <div className={className}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
)

export const Icon: any = styled(IconeContainer)`
    font-size: ${({size = 'clamp(16px, 1.67vw, 24px)'}) => size};
    margin: ${({margin = '0'}) => margin};
`
