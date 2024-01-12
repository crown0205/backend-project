import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import FormBox from "../../components/FormBox";
import TweetCard from "../../components/TweetCard";
import {
  ITweet,
  getAllTweets,
  tweetDelete,
  tweetUpdate,
} from "../../service/tweet";

interface MainProps {
  isToken: boolean;
  user?: string;
}

const Home: React.FC<MainProps> = ({ isToken, user }) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  // FIX createdAt 안내려옴
  const { refetch } = useQuery(
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

  const { mutateAsync: update } = useMutation("tweetUpdate", tweetUpdate, {
    onSuccess: (updateTweet) => {
      const { id } = updateTweet;

      setTweets((prev) => {
        return prev.map((item) => (item.id === id ? updateTweet : item));
      });
    },
    onError: () => {},
  });

  const { mutateAsync: remove } = useMutation("tweetDelete", tweetDelete, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {},
  });

  const handleTweetDelete = (id?: number) => {
    console.log("삭제");
    if (!id) return;
    remove({ id });
  };

  const handleTweetUpdate = (text: string, id?: number) => {
    console.log("업데이트");
    if (!id) return;
    update({
      id,
      text,
    }).then(console.log);
  };

  return (
    <>
      <FormBox setTweets={setTweets} />
      <TweetsList>
        {tweets?.map((tweet) => (
          <TweetCard
            key={tweet?.id}
            tweet={tweet}
            owner={tweet.username === user}
            onUpdate={handleTweetUpdate}
            onDelete={handleTweetDelete}
          />
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
