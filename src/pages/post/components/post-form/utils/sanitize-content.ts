export const sanitizeContent = (content) =>
	content
		.replace('&nbsp', ' ')
		.replace(/ +/, ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('<br>', '')
