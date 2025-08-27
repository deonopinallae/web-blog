import styled from 'styled-components'
import PropTypes from 'prop-types'


const PaginationContainer = ({ className, page, setPage, lastPage }) => {

	return (
		<div className={className}>
			<button disabled={page === 1} className="pagination-button" onClick={() => setPage(1)}>в начало</button>
			<button disabled={page === 1} className="pagination-button" onClick={() => setPage(page - 1)}>предыдущая</button>
			<div className="pagination-button">страница: {page}</div>
			<button disabled={page === lastPage} className="pagination-button" onClick={() => setPage(page + 1)}>следующая</button>
			<button disabled={page === lastPage} className="pagination-button" onClick={() => setPage(lastPage)}>в конец</button>
		</div>
	)
}

export const Pagination: any = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: clamp(20px, 2.08vw, 30px) 0;
	gap: clamp(7px, 0.69vw, 10px);
    font-size: clamp(12px, 1.04vw, 15px); 

	& .pagination-button {
		border: 1px solid #000;
        padding: 5px;
		text-align: center;
	}
`
Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
}