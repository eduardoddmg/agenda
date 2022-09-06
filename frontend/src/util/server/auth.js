import axios from 'axios';
import { API_URI } from '../variables.jsx';

export async function registerAuth(data) {
	try {
	    const resp = await axios.post(`${API_URI}/api/auth/register`, data);
	    return resp;
	} catch (error) {
		return error;
	}
};

export async function loginAuth(token) {
	try {
	    const resp = await axios.post(`${API_URI}/api/auth/verifyId`);	    
	    return resp;
	} catch (error) {
		return error;
	}
};