function saveDataToLocalStorage(data, key) {
	window.localStorage.setItem(key, data);
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
	saveDataToLocalStorage(JSON.stringify(values), key)
}

export { saveNewDataToLocalStorage, getDataFromLocalStorage };
