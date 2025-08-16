import styled from 'styled-components'
import { Icon, Input } from '../../../../components'
import { useRef } from 'react'
import { sanitizeContent } from './utils'
import { useDispatch } from 'react-redux'
import { savePostAsync } from '../../../../actions'
import { useNavigate } from 'react-router-dom'
import { useServerRequest } from '../../../../hooks'

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const imageRef: any = useRef(null)
	const titleRef: any = useRef(null)
	const contentRef: any = useRef(null)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const requestServer = useServerRequest()

	const onSave = () => {
		const newImageUrl = imageRef.current.value
		const newTitle = titleRef.current.value
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => navigate(`/posts/${id}`))
	}

	return (
		<div className={className}>
			<div className="post__info column">
				<Input
					ref={imageRef}
					defaultValue={imageUrl}
					placeholder="изображение..."
				/>
				<Input ref={titleRef} defaultValue={title} placeholder="заголовок..." />
			</div>
			<div className="post__content flex between">
				<div className="post__date">
					<Icon className="calendar" id="fa-calendar-o" />
					<div>{publishedAt}</div>
				</div>
				<div className="post__btns flex">
					<Icon id="fa-save" onClick={onSave} />
				</div>
			</div>
			<p
				ref={contentRef}
				className="post__text"
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{content}
			</p>
		</div>
	)
}

export const PostForm: any = styled(PostFormContainer)`
	padding: clamp(27px, 2.78vw, 40px) clamp(53px, 5.56vw, 80px);
	& .post__date {
		display: flex;
		gap: 10px;
		align-items: center;
		margin: 20px 27px 20px 0;
	}
	& .post__btns {
		gap: 20px;
		align-items: center;
	}
	& .post__info {
		gap: 20px;
	}
	& .post__text {
		border: 1px solid #000;
		outline: none;
		white-space: pre-line;
	}
	& img {
		width: 200px;
		float: left;
		margin: 0 20px 10px 0;
	}
	& .calendar {
		cursor: initial;
	}
	& Input {
		display: block;
		width: 100%;
	}
`
