import React from "react";
import styled from "styled-components";
import FormBox from "../../components/FormBox";
import TweetCard from "../../components/TweetCard";

interface MyPageProps {}

const MyPage: React.FC<MyPageProps> = ({}) => {
  return (
    <>
      {/* <FormBox /> */}
      <TweetsList>
        <TweetCard />
      </TweetsList>
    </>
  );
};

export default MyPage;

const TweetsList = styled.ul`
  height: 100%;
  background-color: #eee;
  padding: 8px 16px;
  overflow-y: auto;
`;
