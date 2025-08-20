import styled from 'styled-components'
import { Icon } from '../../../components'
import { Link } from 'react-router-dom'

const PostCardContainer = ({
	className,
	id,
	imageUrl,
	title,
	publishedAt,
	commentsCount,
}) => {
	return (
		<Link to={`/post/${id}`} className={className}>
			<div className="post-card__img">
				<img src={imageUrl} alt={title} />
			</div>
			<div className="post-card__footer flex column">
				<h3>{title}</h3>
				<div className="post-card__info flex between">
					<div className="post-card__date flex aic">
						{publishedAt && <Icon inactive={true} id="fa-calendar-o" />}
						{publishedAt}
					</div>
					<div className="post-card__comments-count flex aic">
						<Icon inactive={true} id="fa-comment-o" />
						{commentsCount}
					</div>
				</div>
			</div>
		</Link>
	)
}

export const PostCard: any = styled(PostCardContainer)`
	border: 1px solid #000;
	& img {
		object-fit: cover;
	}
	& .post-card {
		&__img {
			overflow: hidden;
			height: clamp(100px, 10.42vw, 150px);
		}
		&__footer {
			border-top: 1px solid #000;
			padding: clamp(10px, 1.04vw, 15px);
			gap: 7px;
		}
		&__date,
		&__comments-count {
			font-size: 14px;
			gap: 5px;
		}
	}
`
