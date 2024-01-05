import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { ITweet, tweetPost } from "../../service/tweet";

interface FormBoxProps {
  setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>;
}

const FormBox: React.FC<FormBoxProps> = ({ setTweets }) => {
  const [post, setPost] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await tweetPost({ text: post }) //
      .then((data) => {
        setPost("");
        setTweets((prevTweets) => [data, ...prevTweets]);
      })
      .catch(console.log);
    // TODO 에러가 잘 내려 오지 않음. 네트워트 로직 수정 필요
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        value={post}
        onChange={handleChange}
        placeholder="New Tweets"
      />
      <button>Post</button>
    </FormContainer>
  );
};

export default FormBox;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  gap: 6px;
  background-color: #101010e9;

  input {
    flex: 4;
    margin: 0;
  }

  button {
    flex: 1;
    margin: 0;
  }
`;
