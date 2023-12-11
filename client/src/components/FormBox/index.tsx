import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

interface FormBoxProps {}

const FormBox: React.FC<FormBoxProps> = ({}) => {
  const [post, setPost] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(post);
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
