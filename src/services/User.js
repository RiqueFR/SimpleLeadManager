import { saveNewDataToLocalStorage, getDataFromLocalStorage } from './Store';

function searchUserByUsername(username) {
	const users = getDataFromLocalStorage('user');
	for (let user of users) {
		if (user.user === username)
			return user;
	}
	return null;
}

function login(username, password) {
	const user = searchUserByUsername(username);
	if (user) {
		if (user.password === password) return true;
	}
	return false;
}

function registerUser(user) {
	// check if user is already register
	if (searchUserByUsername(user.user)) return false;

	// add the new data to the storage
	saveNewDataToLocalStorage(user, 'user')
	return true;
}

export { searchUserByUsername, registerUser, login };
