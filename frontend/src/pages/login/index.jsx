import { useState, useContext } from "react";
import axios from "axios";
import { API_URI, loginAuthWithoutToken } from "../../util";
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
    try {
      setIsLoading(true);
      const resp = await loginAuthWithoutToken(data);
      console.log(resp);
      setIsLoading(false);
      if (resp.status === 200) {
        setIsErrorForm(false);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token: resp.data.token, username: resp.data.username },
        });
        navigate("/dashboard");
      } else if (resp.status !== 200) {
        dispatch("LOGIN_FAILURE");
        setIsErrorForm(true);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
