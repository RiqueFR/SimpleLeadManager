import { saveNewDataToLocalStorage, getDataFromLocalStorage } from './Store';

function searchLeadByName(name) {
	const leads = getDataFromLocalStorage('lead');
	for (let lead of leads) {
		if (lead.name === name)
			return lead;
	}
	return null;
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

export { searchLeadByName, registerLead };
