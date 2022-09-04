import axios from 'axios';
import { API_URI } from '../variables.jsx';

export async function getContacts (id) {
	try {
		const contacts = await axios.get(
        `${API_URI}/api/contact/readContact?idUser=${id}`
      );
		return contacts;
	} catch (error) {
		return error;
	}
};

export async function createContact(data) {
	try {
		const contact = await axios.post(
        `${API_URI}/api/contact/createContact`,
        data
      );
		return contact;
	} catch (error) {
		return error;
	}
};

export async function updateContact(data) {
	try {
		const contact = await axios.put(
        `${API_URI}/api/contact/updateContact`,
        data
      );
		return contact;
	} catch (error) {
		return error;
	}
};

export async function deleteContact(data) {
	try {
		const contact = await axios.delete(
      `${API_URI}/api/contact/deleteContact?idContact=${data._id}`
    );
		return contact;
	} catch (error) {
		return error;
	}
};