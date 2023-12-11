import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import styled from "styled-components";
import Header from "./components/Header";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  max-width: 50%;
  height: 100vh;
  margin: 0 auto;
`;
