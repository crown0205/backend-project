import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface HeaderProps {
  user?: string;
  isToken?: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, isToken, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

  const handleAllTweets = () => {
    if (isToken) {
      navigate("/home");
    } else {
      alert("로그인 후 사용해주세요.");
    }
  };
  const handleMyTweets = () => {
    if (isToken) {
      navigate(`/userName`);
    } else {
      alert("로그인 후 사용해주세요.");
    }
  };

  const handleLogoClick = () => {
    navigate(isToken ? "/home" : "/");
  };

  return (
    <HeaderContainer>
      <LogoBox onClick={handleLogoClick}>
        <img className="logo" src="/img/logo.png" alt="Logo" />
        <h1 className="title">Dwitter</h1>
        <small className="userName">{user}</small>
      </LogoBox>
      <GNBBox>
        <GNBButton
          $isActive={currentLocation === "/home"}
          onClick={handleAllTweets}
        >
          All Tweets
        </GNBButton>
        <GNBButton
          $isActive={currentLocation === "/userName"}
          onClick={handleMyTweets}
        >
          My Tweets
        </GNBButton>
        <GNBButton onClick={onLogout}>{isToken ? "Logout" : "Login"}</GNBButton>
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
  overflow: hidden;
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
    font-size: 28px;
    font-weight: 500;
    color: #fff;
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
`;

const GNBButton = styled.button<{
  $isActive?: boolean;
}>`
  font-size: 12px;
  margin: 0;
  padding: 0 4px;
  width: max-content;

  ${({ $isActive }) =>
    $isActive
      ? css`
          background: #1095c16e;
          border-color: #1095c16e;
        `
      : ""}
`;
