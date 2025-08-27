import styled from 'styled-components'
import { Input, Icon } from '../../../components'
import PropTypes from 'prop-types'


const SearchContainer = ({ className, searchPhrase, onChange}) => {
	return (
		<div className={className}>
			<Input onChange={onChange} value={searchPhrase} placeholder="поиск по заголовкам..." className="search-input" />
			<Icon id="fa-search" inactive={true} />
		</div>
	)
}

export const Search: any = styled(SearchContainer)`
	display: flex;
	align-items: center;
	margin: 0 auto;
	width: clamp(200px, 27.78vw, 400px);
	width: clamp(200px, 27.78vw, 400px);
	border: 1px solid #000;
	margin-bottom: 30px;
	padding: 0 7px;
    & .search-input {
		border: none;
		width: 100%;
	}
`
Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}