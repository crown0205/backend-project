import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { ILoginRequest } from "../../service/auth";

interface LoginProps {
  onLogin: (formData: ILoginRequest) => Promise<void>;
  onSignup: (formData: ILoginInput) => Promise<void>;
}

export interface ILoginInput extends ILoginRequest {
  name?: string;
  email?: string;
  url?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignup }) => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>();

  const handleToggleButton = () => {
    setToggle((value) => !value);
  };

  const onSubmit: SubmitHandler<ILoginRequest | ILoginInput> = (data) => {
    if (!toggle) {
      onLogin(data);
    } else {
      onSignup(data);
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="USERNAME"
          {...register("username", {
            required: "아이디를 입력해주세요",
            maxLength: 20,
          })}
        />
        {errors.username && (
          <small className="errors">{errors?.username.message}</small>
        )}
        <input
          type="password"
          placeholder="PassWord"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            maxLength: 20,
          })}
        />
        {errors.password && (
          <small className="errors">{errors?.password.message}</small>
        )}

        {toggle && (
          <>
            <input type="text" placeholder="Name" {...register("name")} />
            <input type="email" placeholder="Email" {...register("email")} />
            <input
              type="text"
              placeholder="Profile Image URL"
              {...register("url")}
            />
          </>
        )}

        <div>
          <input
            name="checkBox"
            id="checkBox"
            type="checkbox"
            onClick={handleToggleButton}
          />
          <label htmlFor="checkBox">create a new account?</label>
        </div>

        <button className="loginButton">Sign {toggle ? "Up" : "In"}</button>
      </form>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: 100%;
  background-color: #eee;
  padding: 20px 16px 8px;
  overflow-y: auto;

  .errors {
    font-size: 12px;
    color: #f14343;
    font-weight: 600;
    margin-bottom: 6px;
    padding: 0 6px;
  }

  .loginButton {
    margin-top: 24px;
    font-weight: 800;
  }
`;
