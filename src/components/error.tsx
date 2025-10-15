import PropTypes from 'prop-types'

export const Error = ({error}) => {
    return <div>{error.message}</div>
}
Error.propTypes = {
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)])
}