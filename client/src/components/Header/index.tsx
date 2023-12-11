import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const navigate = useNavigate();

  const handleAllTweets = () => {
    navigate("/");
  };
  const handleMyTweets = () => {
    navigate(`/userName`);
  };
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <LogoBox>
        <img className="logo" src="/img/logo.png" alt="Logo" />
        <h1 className="title">Dwitter</h1>
        <small className="userName">@userName</small>
      </LogoBox>
      <GNBBox>
        <button onClick={handleAllTweets}>All Tweets</button>
        <button onClick={handleMyTweets}>My Tweets</button>
        <button onClick={handleLogout}>Logout</button>
      </GNBBox>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  /*  */
  display: flex;
  justify-content: space-between;
  background-color: #000;

  padding: 10px 8px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .logo {
    max-width: 40px;
    max-height: 40px;
  }

  .title {
    font-size: 24px;
    font-weight: 500;
  }

  .userName {
    font-size: 12px;
    font-weight: 600;
    color: #4e87eb;
  }
`;

const GNBBox = styled.nav`
  display: flex;
  gap: 8px;

  button {
    font-size: 12px;
    margin: 0;
    padding: 0 4px;
    width: max-content;
  }
`;
