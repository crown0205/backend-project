import React from "react";
import styled from "styled-components";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  return (
    <MainContainer>
      <div>Main</div>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  /*  */
  background-color: #eee;
`;
