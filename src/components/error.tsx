import PropTypes from 'prop-types'

export const Error = ({error}) => {
    return <div>
			<div>{error}</div>
		</div>
}
Error.propTypes = {
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)])
}