function saveDataToLocalStorage(data, key) {
	console.log(window.localStorage.setItem(key, data));
}

function getFromLocalStorage(key) {
	return window.localStorage.getItem(key);
}

function saveNewDataToLocalStorage(data, key) {
	let values = JSON.parse(getFromLocalStorage(key) ?? '[]');
	values = [
		...values,
		data
	]
	saveDataToLocalStorage(JSON.stringify(values), key)
}

export { saveDataToLocalStorage, saveNewDataToLocalStorage, getFromLocalStorage };
