import { useState, useContext } from "react";
import axios from "axios";
import { API_URI } from "../../util";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context";

import { Layout } from "../../components";

import * as S from "../../styles/geral.js";

import { Button, Input } from "@chakra-ui/react";

export function Login() {
  const { register, handleSubmit } = useForm();
  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const respUser = await axios.post(`${API_URI}/api/auth/login`, data);
    const respUserData = respUser.data;
    const userData = respUserData.data;
    const respType = respUserData.type;
    const respContacts = await axios.get(
      `${API_URI}/api/contact/readContact?idUser=${userData._id}`
    );
    const respContactsData = respContacts.data;
    const respContactsType = respContactsData.type;
    const contacts = respContactsData.data;
    setIsLoading(false);
    if (respType === "success") {
      navigate("/dashboard");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { id: userData._id, username: userData.username, contacts },
      });
    } else if (respType === "error") dispatch("LOGIN_FAILURE");
  };

  return (
    <Layout>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <Input type="text" placeholder="username" {...register("username")} />
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <Button isLoading={isLoading} colorScheme="blue" type="submit">
          submit
        </Button>
      </S.Form>
    </Layout>
  );
}
