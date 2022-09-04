import Navbar from "./Navbar";
import Footer from "./Footer";
import * as S from '../styles/geral.js';

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      <S.Container>
        {children}
      </S.Container>
      <Footer />
    </>
  );
}
