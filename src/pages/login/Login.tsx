import React, { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftSignContainer from "../../components/auth/LeftSignContainer";
import { storeTokenInCookie } from "../../components/auth/loginUtils";
import { postSignIn } from "../../api/api-user";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const { mutate: loginMutation } = useMutation(postSignIn, {
    // useQuery와 동일합니다 에러가 나면 실행되는 함수입니다.
    onError: (error) => {
      console.error("Error:", error);
    },
    // 말그대로 성공하면 실행되는 함수입니다.
    // 글을 생성하는 post니까 성공했을 땐 여기서 queryClient.invalidates([{postListAPI의 키값}])같은 코드를 넣어주면 글쓰기가 성공했을 때 자동으로 업데이트되겠죠?
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation({
      email: email,
      password: password,
    });
    // if (!email || !password) {
    //   console.log("모든 필드를 입력해야 합니다.");
    //   return;
    // }

    // try {
    //   const response = await axios.post(
    //     "http://34.22.79.51:5000/api/user/login",
    //     {
    //       email,
    //       password,
    //     }
    //   );
    //   // response값 확인
    //   console.log(response);

    //   if (response.status === 200) {
    //     const { resultCode, message, data } = response.data;

    //     if (resultCode === "200") {
    //       const { user_id, token } = data || {}; // 데이터가 undefined인 경우 빈 객체를 기본값으로 사용

    //       if (user_id && token) {
    //         storeTokenInCookie(token);

    //         console.log("User ID:", user_id);
    //         console.log("Token:", token);

    //         fetchUserData(token, user_id);
    //         // navigate('/'); // 로그인 성공시 홈으로 이동
    //       }
    //     } else {
    //       setError(message);
    //     }
    //   } else {
    //     setError("네트워크 오류가 발생했습니다.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
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
