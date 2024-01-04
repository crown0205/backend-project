import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login, { ILoginInput } from "./pages/Login";
import { ILoginRequest, login, logout, signup } from "./service/auth";
import { GlobalStyle } from "./styles";
import MyPage from "./pages/MyPage";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isToken = localStorage.getItem("token");
  const [user, setUser] = useState<string | undefined>();
  /** TODO
   * page 추가
   *  - My page
   */

  const handleLogin = async (formData: ILoginRequest) => {
    await login(formData) //
      .then((user) => {
        setUser(user);
        navigate("/home");
      });
  };

  const handleSignup = async (formData: ILoginInput) => {
    await signup(formData) //
      .then((user) => {
        setUser(user);
        navigate("/home");
      });
  };

  const handleLogout = async () => {
    if (user) {
      await logout().then(() => setUser(undefined));
    }

    if (pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Header user={user} isToken={!!isToken} onLogout={handleLogout} />
        <Routes>
          {isToken ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/username" element={<MyPage />} />
            </>
          ) : (
            <Route
              path="/"
              element={<Login onLogin={handleLogin} onSignup={handleSignup} />}
            />
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-width: 80%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
