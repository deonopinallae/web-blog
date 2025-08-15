export const addComment = (userId, postId, content) =>
	fetch('http://localhost:3000/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset-utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
            post_id: postId,
			published_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
			content,
		}),
	})
