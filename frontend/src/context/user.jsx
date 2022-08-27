import { useState, useReducer, createContext } from 'react';

const INITIAL_STATE = {
	username: "teste",
	id: "",
	contacts: null
}

export const userContext = createContext(INITIAL_STATE);

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				username: action.payload.username,
				id: action.payload.id,
				contacts: action.payload.contacts
			}
		case "LOGIN_FAILURE":
			return {
				username: "",
				id: "",
				contacts: null
			}
		default:
			return state;
	}
}

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	console.log('state', state);
	
	return (
		<userContext.Provider value={{ username: state.username, id: state.id, contacts: state.contacts, dispatch}}>
			{children}
		</userContext.Provider>
	)
}
