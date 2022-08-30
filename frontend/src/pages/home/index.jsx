import { useContext, useEffect } from "react";
import { userContext } from "../../context";

import { Layout } from "../../components";

export function Home() {
  const { username, dispatch } = useContext(userContext);

  return (
    <Layout>
      <h1>{username}</h1>
    </Layout>
  );
}
