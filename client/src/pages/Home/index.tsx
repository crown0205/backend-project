import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import FormBox from "../../components/FormBox";
import TweetCard from "../../components/TweetCard";
import { getAllTweets } from "../../service/tweet";

interface MainProps {
  isToken: boolean;
}

const Home: React.FC<MainProps> = ({ isToken }) => {
  const { data: tweetsList } = useQuery(
    "getAllTweets",
    async () => getAllTweets(),
    {
      onError: console.error,
      enabled: isToken,
      refetchOnWindowFocus: false,
      cacheTime: 6000 * 5,
    }
  );

  return (
    <>
      <FormBox />
      <TweetsList>
        {tweetsList?.map((tweet) => (
          <TweetCard key={tweet?.id} tweet={tweet} />
        ))}
      </TweetsList>
    </>
  );
};

export default Home;

const TweetsList = styled.ul`
  height: 100%;
  background-color: #eee;
  padding: 8px 16px;
  overflow-y: auto;
`;
