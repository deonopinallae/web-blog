import { useEffect, useLayoutEffect, useState } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PostContent, Comments, PostForm } from './components'
import { useServerRequest } from '../../hooks'
import { loadPostAsync, RESET_POST_DATA } from '../../actions'
import { selectPost } from '../../selectors'
import { Error, PrivateContent } from '../../components'
import { ROLE } from '../../constants'

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const post = useSelector(selectPost)
	const dispatch = useDispatch()
	const params = useParams()
	const isEditing = !!useMatch('/post/:id/edit')
	const isCreating = !!useMatch('/post')
	const requestServer = useServerRequest()


	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false)
			return
		} 
		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error)
			setIsLoading(false)
		})
	}, [dispatch, requestServer, params.id, isCreating])

	if (isLoading) null


	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]} serverError={error}>
				<div className={className}>
					<PostForm {...{ post }} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		)

	return error ? <Error error={error} /> : SpecificPostPage
}

export const Post: any = styled(PostContainer)``
