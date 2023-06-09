import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TitleText } from '../../constants/fonts';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 테스트데이터
  const testData = [
    {
      email: 'cobaltcyan.park@gmail.com',
      password: 'tpwls1234',
    },
  ];

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("모든 필드를 입력해야 합니다.");
      return;
    }

    try {
      // 테스트 데이터에서 이메일과 비밀번호가 일치하는지 확인
      const matchedUser = testData.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        console.log("로그인 성공");

        // 로그인 성공 시에만 Axios를 사용하여 POST 요청을 보냄
        const response = await axios.post('/api/user/login', {
          email,
          password
        });

        console.log(response.data); // 응답 데이터에 접근

      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      console.log("에러 발생:", error);
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onClickSignup = () => {
    navigate('./signup'); // useNavigate 사용하여 페이지 이동
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const fetchData = () => {
    return axios
      .get("http://34.22.79.51:5000/api/community/list")
      .then((response) => response.data);
  };

  return (
    <StyledCommonContainer>
      <StyledLoginWrapper>
        <StyledLoginContainer>
          <StyledLoginTitleContainer>
            <StyledLoginText>면접을 면접답게</StyledLoginText>
            <StyledLoginText>면접왕</StyledLoginText>
            <StyledLoginText>면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요</StyledLoginText>
          </StyledLoginTitleContainer>
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
              <StyledSignupBtn variant="contained" color="primary" type="button" onClick={onClickSignup}>
                회원가입
              </StyledSignupBtn>
              <StyledLoginBtn variant="contained" color="primary" type="submit">
                로그인
              </StyledLoginBtn>
            </StyledBtnWrapper>
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
  background-color: #f1f4ff;
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
const StyledLoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLoginText = styled.div`
  height: fit-content;
  ${TitleText}
  color: ${colors.main_navy};
  font-size: 64px; 
  font-weight:400;
  
  &:nth-of-type(2) {
    color: ${colors.main_mint};
    margin-top: 20px;
  }

  &:nth-of-type(3) {
    font-family: none;
    color: #8689A3;
    font-size: 18px;
    font-weight:300;
    margin-top: 50px;
  }
`;
const StyledSignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 330px;
`;

const StyledSignupInput = styled.input`
  width: 457px;
  height: 45px;
  margin-top: 15px;
  color: #C0C3E5;
  border: 1px solid #C0C3E5;
  border-radius: 10px;
  padding-left: 18px;
  font-weight: 300;
  font-size: 18px; 
  &:first-of-type {
    margin-top: 15px; 
  }
  &::placeholder {
    color: #C0C3E5;
  }
  &:focus {
    outline: none;
    border: 1px solid #C0C3E5;
    box-shadow: none;
  }
`;
const StyledBtnWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  margin-left: auto;
`
const StyledSignupBtn = styled(Button)`
  &&{
    width: 132px;
    height: 45px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    background-color: #00E595;
    color: #0E0E0E;
    border: 1px solid #00E595;
    &:hover {
      background-color: #00E595;
    }
  }
`;
const StyledLoginBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    color: #ffffff;
    font-weight: 600;
    font-size: 18px;
    background-color: #2E3057;
    color: #ffffff;
    border: 1px solid #2E3057;
    margin-left: 40px;
    &:hover {
      background-color: #2E3057;
    }
  }
`;
const StyledSignupCopyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: #C0C3E5;
`;

export default LoginPage;
