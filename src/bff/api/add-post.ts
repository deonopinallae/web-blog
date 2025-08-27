export const addPost = ({ imageUrl, title, content }) =>
	fetch('http://localhost:3000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			published_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
			title,
			content,
		}),
	}).then((createdPost) => createdPost.json())
