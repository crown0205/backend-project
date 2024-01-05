import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import FormBox from "../../components/FormBox";
import TweetCard from "../../components/TweetCard";
import { ITweet, getAllTweets } from "../../service/tweet";

interface MainProps {
  isToken: boolean;
}

const Home: React.FC<MainProps> = ({ isToken }) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  // FIX createdAt 안내려옴
  useQuery(
    "getAllTweets", //
    async () => getAllTweets(),
    {
      onSuccess: (result) => {
        setTweets(result);
      },
      onError: console.error,
      enabled: isToken,
      cacheTime: 6000 * 5,
    }
  );

  return (
    <>
      <FormBox setTweets={setTweets} />
      <TweetsList>
        {tweets?.map((tweet) => (
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
