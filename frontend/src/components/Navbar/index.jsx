import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context";

import { Button } from "@chakra-ui/react";

import * as S from "./styled.js";

export default function Navbar() {
  const { token, dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <S.Navbar>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      {token && (
        <Button colorScheme="blue" onClick={logout}>
          logout
        </Button>
      )}
    </S.Navbar>
  );
}
