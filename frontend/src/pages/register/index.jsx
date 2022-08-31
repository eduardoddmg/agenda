import { useState, useEffect } from "react";
import axios from "axios";
import { API_URI } from "../../util";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import { Layout } from "../../components";

import * as S from "../../styles/geral.js";

import { Input, Button } from "@chakra-ui/react";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const resp = await axios.post(`${API_URI}/api/auth/register`, data);
    console.log(resp.data);
    setIsLoading(false);
  };

  return (
    <Layout>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <Input type="text" placeholder="username" {...register("username")} />
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <Input type="email" placeholder="email" {...register("email")} />
        <Button isLoading={isLoading} colorScheme="blue" type="submit">
          submit
        </Button>
        <p>Já tem uma conta? <Link to="/login"><b>Faça o login</b></Link></p>
      </S.Form>
    </Layout>
  );
}
