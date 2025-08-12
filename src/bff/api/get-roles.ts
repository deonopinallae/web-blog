export const getRoles = async () =>
	fetch('http://localhost:3000/roles').then((loadedRoles) =>
		loadedRoles.json()
	)
