import { useEffect, useLayoutEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PostContent, Comments, PostForm } from './components'
import { useServerRequest } from '../../hooks'
import { loadPostAsync, RESET_POST_DATA } from '../../actions'
import { selectPost } from '../../selectors'

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost)
	const dispatch = useDispatch()
	const params = useParams()
	const isEditing = useMatch('/post/:id/edit')
	const isCreating = useMatch('/post')
	const requestServer = useServerRequest()

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	},[dispatch, isCreating])

	useEffect(() => {
		if(isCreating) return
 		dispatch(loadPostAsync(requestServer, params.id))
	}, [dispatch, requestServer, params.id, isCreating])

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm {...{post}} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	)
}

export const Post: any = styled(PostContainer)``
