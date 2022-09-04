import { useState, useContext } from "react";
import axios from "axios";
import { API_URI } from "../../util";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../../context";

import { Layout } from "../../components";

import * as S from "../../styles/geral.js";

import { Button, Input, FormControl, FormHelperText } from "@chakra-ui/react";

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isErrorForm, setIsErrorForm] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const respUser = await axios.post(`${API_URI}/api/auth/login`, data);
    console.log(respUser);
    const respUserData = respUser.data;
    const userData = respUserData.data;
    const respType = respUserData.type;
    
    setIsLoading(false);
    if (respType === "success") {
      setIsErrorForm(false);
      const respContacts = await axios.get(
      `${API_URI}/api/contact/readContact?idUser=${userData._id}`
      );
      const respContactsData = respContacts.data;
      const respContactsType = respContactsData.type;
      const contacts = respContactsData.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { id: userData._id, username: userData.username, contacts },
      });
      navigate("/dashboard");
    } else if (respType === "error") {
      dispatch("LOGIN_FAILURE");
      setIsErrorForm(true);
  }
  };

  return (
    <Layout>
      <S.Form onSubmit={handleSubmit(onSubmit)} form="true">
        <h1>Login</h1>
        <FormControl isInvalid={errors.username}>
          <Input type="text" placeholder="username" {...register("username", 
            {required: "Username precisa ter no mínimo 8 caracteres", 
            minLength: { 
              value: 8, message: "Username precisa ter no mínimo 8 caracteres"
              }
            })} />
          {errors.username && (
            <FormHelperText color="red.500">
              {errors.username.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <Input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "Password precisa ter no mínimo 8 caracteres", 
              minLength: { 
              value: 8, message: "Password precisa ter no mínimo 8 caracteres"
              }
            })}
          />
          {errors.password && (
            <FormHelperText color="red.500">
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button isLoading={isLoading} colorScheme="blue" type="submit">
          submit
        </Button>
        <p>Não tem uma conta? <Link to="/register"><b>Se registre</b></Link></p>
      </S.Form>
    </Layout>
  );
}
