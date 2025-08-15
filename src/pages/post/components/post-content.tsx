import styled from 'styled-components'
import { Icon } from '../../../components'

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const onPostEdit = () => {}
	const onPostDelete = () => {}
	return (
		<div className={className}>
			<img src={imageUrl} />
			<h1 className="post__title">{title}</h1>
			<div className="post__content flex between">
				<div className="post__date">
					<Icon className="calendar" id="fa-calendar-o" />
					<div>{publishedAt}</div>
				</div>
				<div className="post__btns flex">
					<Icon id="fa-edit" onClick={onPostEdit} />
					<Icon id="fa-trash-o" onClick={onPostDelete} />
				</div>
			</div>
			<p>{content}</p>
		</div>
	)
}

export const PostContent: any = styled(PostContentContainer)`
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
	& img {
		width: 200px;
		float: left;
		margin: 0 20px 10px 0;
	}
	& .calendar {
		cursor: initial;
	}
`
