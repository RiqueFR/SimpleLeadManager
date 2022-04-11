function saveDataToLocalStorage(data, key) {
	window.localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
	return window.localStorage.getItem(key);
}

function getDataFromLocalStorage(key) {
	let leads = JSON.parse(getFromLocalStorage(key) ?? '[]');
	return leads;
}

function saveNewDataToLocalStorage(data, key) {
	let values = getDataFromLocalStorage(key);
	values = [
		...values,
		data
	]
	saveDataToLocalStorage(values, key)
}

export { saveNewDataToLocalStorage, saveDataToLocalStorage, getDataFromLocalStorage };
