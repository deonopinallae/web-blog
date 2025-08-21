import { useMemo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PostCard, Pagination, Search } from './components'
import { useServerRequest } from '../../hooks'
import { PAGINATION_LIMIT } from '../../constants'
import { debounce, getLastPageFromLinks } from './utils'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [shouldSearch, setShouldSearch] = useState(false)
	const [searchPhrase, setSearchPhrase] = useState('')
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts)

				setLastPage(getLastPageFromLinks(links))
			},
		)
	}, [requestServer, page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<main className={className}>
			<div className="post-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, imageUrl, title, publishedAt, commentsCount }) => (
								<PostCard
									key={id}
									{...{
										id,
										imageUrl,
										title,
										publishedAt,
										commentsCount,
									}}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">статьи не найдены</div>
				)}
			</div>

			{lastPage > 1 && posts.length > 0 && <Pagination {...{ page, setPage, lastPage }} />}
		</main>
	)
}

export const Main: any = styled(MainContainer)`
	& .post-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(33px, 3.47vw, 50px);
		margin: 0 clamp(36px, 3.75vw, 54px);
	}
	& .no-posts-found {
		text-align: center;
	}
`
