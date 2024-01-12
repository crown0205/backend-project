import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login, { ILoginInput } from "./pages/Login";
import MyPage from "./pages/MyPage";
import { ILoginRequest, login, logout, me, signup } from "./service/auth";
import { GlobalStyle } from "./styles";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isToken = localStorage.getItem("token");
  const [user, setUser] = useState<string | undefined>();

  useEffect(() => {
    me() //
      .then((user) => {
        console.log(user);
        if (user) {
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);

        navigate("/", { replace: true });
      });
  }, []);

  const handleLogin = async (formData: ILoginRequest) => {
    await login(formData) //
      .then((user) => {
        setUser(user);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = async (formData: ILoginInput) => {
    await signup(formData) //
      .then((user) => {
        setUser(user);
        navigate("/home");
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    if (user || !!isToken) {
      logout();
      setUser(undefined);
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
              <Route
                path="/home"
                element={<Home isToken={!!isToken} user={user} />}
              />
              <Route path="/username" element={<MyPage user={user} />} />
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
