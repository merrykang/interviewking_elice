import React, { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftSignContainer from "../../components/auth/LeftSignContainer";
import { storeTokenInCookie } from "../../components/auth/loginUtils";
import { getUserData, postSignIn } from "../../api/api-user";
import Cookies from "js-cookie";
function setTokenCookie(token: string) {
  Cookies.set("token", token, { expires: 7, path: "/" });
}
function getTokenFromCookie(): string | undefined {
  return Cookies.get("token");
}

const LoginPage = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // useEffect(() => {
  //   const cookieToken = getTokenFromCookie();
  //   setToken(cookieToken);
  // }, []);

  const onClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postSignIn(email, password); // API 요청
    console.log("postSignIn :", response.data);
    const token = getTokenFromCookie();
    console.log("token :", token);
    if (response && response.data && response.data.token) {
      const token = response.data.token;
      setTokenCookie(token); // 토큰을 쿠키에 저장
      console.log("토큰은 :", token);
      console.log("내 정보 조회");
      getUserData();
    } else {
      console.log("에러");
    }
  };
  // console.log("내 정보 조회2");
  // getUserData();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onClickSignup = () => {
    navigate("./signup"); // useNavigate 사용하여 페이지 이동
  };

  return (
    <StyledCommonContainer>
      <StyledLoginWrapper>
        <StyledLoginContainer>
          <LeftSignContainer />
          <StyledSignupContainer onSubmit={onClickSubmit}>
            <StyledSignupInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <StyledSignupInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <StyledBtnWrapper>
              <StyledSignupBtn
                variant="contained"
                color="primary"
                type="button"
                onClick={onClickSignup}
              >
                회원가입
              </StyledSignupBtn>
              <StyledLoginBtn variant="contained" color="primary" type="submit">
                로그인
              </StyledLoginBtn>
            </StyledBtnWrapper>
            {error && (
              <StyledErrorMessage>{error.toString()}</StyledErrorMessage>
            )}
          </StyledSignupContainer>
        </StyledLoginContainer>
        <StyledSignupCopyright>
          Copyright © 2023 INTERVIEWKING All Rights Reserved.
        </StyledSignupCopyright>
      </StyledLoginWrapper>
    </StyledCommonContainer>
  );
};

const StyledCommonContainer = styled.div`
  background-color: ${colors.back_navy};
`;

const StyledLoginWrapper = styled.div`
  width: 1270px;
  margin: 0 auto;
  padding-bottom: 30px;
`;

const StyledLoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
`;

const StyledSignupInput = styled.input`
  width: 457px;
  height: 45px;
  margin-top: 15px;
  color: ${colors.main_black};
  border: 1px solid ${colors.gray_navy};
  border-radius: 10px;
  padding-left: 18px;
  font-weight: 300;
  font-size: 18px;
  &:first-of-type {
    margin-top: 15px;
  }
  &::placeholder {
    color: ${colors.gray_navy};
  }
  &:focus {
    outline: none;
    border: 1px solid ${colors.gray_navy};
    box-shadow: none;
  }
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  margin-left: auto;
`;

const StyledSignupBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    background-color: ${colors.main_mint};
    color: ${colors.main_black};
    border: 1px solid ${colors.main_mint};
    &:hover {
      background-color: ${colors.main_mint};
    }
  }
`;

const StyledLoginBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    color: ${colors.back_navy};
    font-weight: 600;
    font-size: 18px;
    background-color: ${colors.dark_navy};
    border: 1px solid ${colors.dark_navy};
    margin-left: 15px;
    &:hover {
      background-color: ${colors.dark_navy};
    }
  }
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const StyledSignupCopyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${colors.gray_navy};
`;

export default LoginPage;
