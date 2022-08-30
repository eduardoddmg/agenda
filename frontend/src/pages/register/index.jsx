import axios from "axios";
import { useEffect } from "react";
import { API_URI } from "../../util";
import { useForm } from "react-hook-form";

import { Layout } from "../../components";

import * as S from "../../styles/geral.js";

import { Input, Button } from "@chakra-ui/react";

export function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const resp = await axios.post(`${API_URI}/api/auth/register`, data);
    console.log(resp);
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
        <Button colorScheme="blue" type="submit">
          submit
        </Button>
      </S.Form>
    </Layout>
  );
}
