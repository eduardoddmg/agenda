import { useState, useEffect, useReducer, createContext } from 'react';
import axios from 'axios';
import { API_URI } from '../util';

const INITIAL_STATE = {
	username: '',
	token: localStorage.getItem("token") || "",
	contacts: '',
	loading: localStorage.getItem("token") ? true : false
}

export const userContext = createContext(INITIAL_STATE);

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_START":
			return { loading: true }
		case "LOGIN_SUCCESS":
			localStorage.setItem("token", action.payload.id);
			return {
				username: action.payload.username,
				token: action.payload.id,
				contacts: action.payload.contacts,
				loading: false
			}
		case "LOGIN_FAILURE":
			localStorage.setItem("token", "");
			return {
				username: '',
				token: "",
				contacts: '',
				loading: false
			}
		case "ADD_CONTACT":
			return {
				contacts: action.payload.contacts,
				token: action.payload.token
			}
		default:
			return state;
	}
}

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const getData = async () => {
		if (state.token) {
			const resp = await axios.get(`${API_URI}/api/auth/verifyId?idUser=${state.token}`);
			const respData = resp.data;
			const respDataType = respData.type;
			const user = respData.data;
			const respContacts = await axios.get(`${API_URI}/api/contact/readContact?idUser=${user._id}`);
			const respContactsData = respContacts.data;
			const respContactsType = respContactsData.type;
			const contacts = respContactsData.data;
			dispatch({ type: "LOGIN_START" });
			if (respDataType === "success") {
				dispatch({ type: "LOGIN_SUCCESS", payload: {username: user.username, id: user._id, contacts }});
			} else if (respDataType === "error") {
				dispatch({ type: "LOGIN_FAILURE" });
			}
		}
	}

	useEffect(() => {
		getData();
	}, []);
	
	return (
		<userContext.Provider value={{ username: state.username, token: state.token, contacts: state.contacts, loading: state.loading, dispatch}}>
			{children}
		</userContext.Provider>
	)
}
