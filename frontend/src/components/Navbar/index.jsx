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
      <section>
        <Link to="/">Home</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
      </section>
      <section>
        {token ? 
          <Button colorScheme="whiteAlpha" onClick={logout}>
            logout
          </Button> : <Button as={Link} colorScheme="blue" to="/login">Entrar</Button>
        }
      </section>
    </S.Navbar>
  );
}
