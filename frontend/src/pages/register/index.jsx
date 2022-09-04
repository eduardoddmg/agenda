import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from "../../components";
import * as S from "../../styles/geral.js";
import { Input, Button, FormControl, FormHelperText } from "@chakra-ui/react";
import { registerAuth, regexEmail }from '../../util';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const register = await registerAuth(data);
    if (register.data.type === "success") {
      navigate('/login');
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <S.Form onSubmit={handleSubmit(onSubmit)} form="true">
        <h1>Register</h1>
        <FormControl isInvalid={errors.username}>
          <Input type="text" placeholder="username" {...register("username", 
            {required: "Username precisa ter no mínimo 8 caracteres", 
            minLength: { 
              value: 8, message: "Username precisa ter no mínimo 8 caracteres"
              }
            }
            )} />
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
            {...register("password", 
              {required: "Password precisa ter no mínimo 8 caracteres", 
              minLength: { 
              value: 8, message: "Password precisa ter no mínimo 8 caracteres"
              }})
            }
          />
          {errors.password && (
            <FormHelperText color="red.500">
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={errors.email}>
          <Input type="email" placeholder="email" {...register("email", 
            {
              required: "Email inválido", 
              pattern: { value: regexEmail, message: "Email inválido"}
            })} />
          {errors.email && (
            <FormHelperText color="red.500">
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button isLoading={isLoading} colorScheme="blue" type="submit">
          submit
        </Button>
        <p>Já tem uma conta? <Link to="/login"><b>Faça o login</b></Link></p>
      </S.Form>
    </Layout>
  );
}
