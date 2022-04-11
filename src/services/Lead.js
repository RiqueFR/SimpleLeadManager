import { saveNewDataToLocalStorage, getDataFromLocalStorage, saveDataToLocalStorage } from './Store';

function searchLeadByName(name) {
	const leads = getDataFromLocalStorage('lead');
	for (let lead of leads) {
		if (lead.name === name)
			return lead;
	}
	return null;
}

function searchLeadsByStatus(search) {
	const leads = getDataFromLocalStorage('lead');
	let result = [];
	for (let lead of leads) {
		if (lead.status === search) result.push(lead);
	}
	return (result);
}

function updateLeadStatus(lead, status) {
	if(lead.id < 1) return false;
	let values = getDataFromLocalStorage('lead');
	if(lead.id > values.length) return false;
	values[lead.id - 1].status = status;
	saveDataToLocalStorage(values, 'lead');
	return true
}

function registerLead(lead) {
	let values = getDataFromLocalStorage('lead');
	const size = values.length;

	// add id and status field to the lead
	lead = {
		...lead,
		id: (size + 1),
		status: "Cliente em Potencial"
	}

	// add the new data to the storage
	saveNewDataToLocalStorage(lead, 'lead')
	return true;
}

export { searchLeadByName, searchLeadsByStatus, registerLead, updateLeadStatus };
