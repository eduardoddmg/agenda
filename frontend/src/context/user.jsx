import { useState, useEffect, useReducer, createContext } from "react";
import axios from "axios";
import { API_URI, loginAuth, getContacts as getContactsServer } from "../util";

const INITIAL_STATE = {
  username: "",
  token: localStorage.getItem("token") || "",
  contacts: "",
};

export const userContext = createContext(INITIAL_STATE);

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        username: action.payload.username,
        token: action.payload.token,
        contacts: action.payload.contacts,
      };
    case "LOGIN_FAILURE":
      localStorage.setItem("token", "");
      return {
        username: "",
        token: "",
        contacts: "",
      };
    case "LOGOUT":
      localStorage.setItem("token", "");
      return {
        username: "",
        token: "",
        contacts: "",
      };
    case "GET_CONTACT":
      console.log(action.payload.contacts);
      return {
        contacts: action.payload.contacts,
        token: action.payload.token,
        username: state.username
      };
    default:
      return state;
  }
};

export const login = async (token, dispatch) => {
    if (token) {
      const login = await loginAuth(token);
      console.log(login);
      const contacts = await getContactsServer(login.data.data._id);
      if (login.data.type === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { username: login.data.data.username, id: login.data.data._id, contacts: contacts.data.data },
        });
      } else if (login.data.type === "error") {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      login(state.token,dispatch)
    }
  }, []);

  const getContact = async (token, dispatch) => {
    const resp = await getContactsServer(token);
    const contacts = resp.data.data;
    dispatch({ type: "GET_CONTACT", payload: { contacts, token } });
  };

  return (
    <userContext.Provider
      value={{
        username: state.username,
        token: state.token,
        contacts: state.contacts,
        loading: state.loading,
        dispatch,
        login,
        getContact,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
