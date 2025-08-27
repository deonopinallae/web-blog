import styled from 'styled-components'
import { Icon, Input } from '../../../../components'
import { useLayoutEffect, useRef, useState } from 'react'
import { sanitizeContent } from './utils'
import { useDispatch } from 'react-redux'
import { savePostAsync } from '../../../../actions'
import { useNavigate } from 'react-router-dom'
import { useServerRequest } from '../../../../hooks'
import { PROP_TYPE } from '../../../../constants'


const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
	const [titleValue, setTitleValue] = useState(title)
	const contentRef: any = useRef(null)

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl)
		setTitleValue(title)
	}, [imageUrl, title])

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const requestServer = useServerRequest()

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({id}) => navigate(`/post/${id}`))
	}

	return (
		<div className={className}>
			<div className="post__info column">
				<Input
					value={imageUrlValue}
					placeholder="изображение..." onChange={({target}) => setImageUrlValue(target.value)}
				/>
				<Input value={titleValue} placeholder="заголовок..." onChange={({target}) => setTitleValue(target.value)} />
			</div>
			<div className="post__content flex between">
				<div className="post__date">
					{publishedAt && <Icon inactive={true} id="fa-calendar-o" />}
					{publishedAt}
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
		height: 100px;
	}
	& img {
		width: 200px;
		float: left;
		margin: 0 20px 10px 0;
	}
	& Input {
		display: block;
		width: 100%;
	}
`
PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired
}