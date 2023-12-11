import React from "react";
import styled from "styled-components";
import TweetCard from "../../components/TweetCard";
import FormBox from "../../components/FormBox";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  return (
    <>
      <FormBox />
      <TweetsList>
        <TweetCard />
      </TweetsList>
    </>
  );
};

export default Main;

const TweetsList = styled.ul`
  height: 100%;
  background-color: #eee;
  padding: 8px 16px;
  overflow-y: auto;
`;
