import React, { ChangeEvent, useState } from 'react';
import styled from "styled-components";
import { colors } from '../../constants/colors';
import { TitleText } from '../../constants/fonts';
import Button from "@mui/material/Button";
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 테스트 데이터
  const testData: { name: string; email: string; password: string; phone_number: string; }[] = [
    {
      name: "박세진",
      email: "cobaltcyan.park@gmail.com",
      password: "tpwls1234",
      phone_number: "010-4916-4244",
    },
  ];

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const replaceText = "";
    const nameValidated = name.replace(/[^가-힣a-zA-Z]/g, replaceText);
    const phoneValidated = phone.replace(/[^0-9-]/g, replaceText);
    const emailValidated = email.replace(/[^a-zA-Z0-9@.]/g, replaceText);
    const passwordValidated = password.replace(/[^a-zA-Z0-9]/g, replaceText);
    const confirmPasswordValidated = confirmPassword.replace(/[^a-zA-Z0-9]/g, replaceText);

    if (!name || !phone || !email || !password || !confirmPassword) {
      console.log("모든 필드를 입력해야 합니다.");
      return;
    }

    if (nameValidated.length < 2) {
      console.log("이름은 최소 2자 이상이어야 합니다.");
      return;
    }

    if (phoneValidated !== phone) {
      console.log("전화번호는 숫자와 - 기호로만 입력해야 합니다.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log("유효한 이메일 주소를 입력해야 합니다.");
      return;
    }

    if (passwordValidated.length < 6) {
      console.log("비밀번호는 6자 이상으로 설정해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      console.log("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 테스트 데이터에서 이름, 이메일, 비밀번호, 전화번호가 일치하는지 확인
    const matchedUser = testData.find(
      (user: { name: string; email: string; password: string; phone_number: string; }) =>
        user.name === name &&
        user.email === email &&
        user.password === password &&
        user.phone_number === phone
    );

    if (matchedUser) {
      console.log("회원가입 성공");
      console.log(matchedUser);
    } else {
      console.log("테스트 데이터와 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post('/api/user/register', {
        name,
        phone,
        email,
        password,
      });

      console.log("회원가입 성공");
      console.log(response.data);
    } catch (error) {
      console.log("회원가입 실패");
      console.error(error);
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <StyledSignupWrapper>
      <StyledSignupContainer>
        <StyledSignupTitleContainer>
          <StyledSignupText>면접을 면접답게</StyledSignupText>
          <StyledSignupText>면접왕</StyledSignupText>
          <StyledSignupText>면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요</StyledSignupText>
        </StyledSignupTitleContainer>
        <StyledSignupInputContainer onSubmit={onClickSubmit}>
          <StyledSignupInput
            type="text"
            placeholder="이름"
            value={name}
            onChange={onChangeName}
          />
          <StyledSignupInput
            type="tel"
            placeholder="전화번호"
            value={phone}
            onChange={onChangePhone}
          />
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
          <StyledSignupInput
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onChangePasswordConfirm}
          />
          <StyledSignupBtn variant="contained" color="primary" type="submit">
            가입하기
          </StyledSignupBtn>
        </StyledSignupInputContainer>
      </StyledSignupContainer>
      <StyledSignupCopyright>
        Copyright © 2023 INTERVIEWKING All Rights Reserved.
      </StyledSignupCopyright>
    </StyledSignupWrapper>
  );
};

const StyledSignupWrapper = styled.div`
  background-color: #f1f4ff;
  padding-bottom: 30px;
`;

const StyledSignupContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledSignupTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`;
const StyledSignupText = styled.div`
    height: fit-content;
    ${TitleText}
    color: ${colors.main_navy};
    font-size: 64px; 
    font-weight:400;

    &:nth-of-type(2) {
      color: #00E595;
      margin-top: 20px;
    }

    &:nth-of-type(3) {
      font-family: none;
      color: #8689A3;
      font-size: 18px;
      font-weight:300;
      margin-top: 50px;
    }
  `
const StyledSignupInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 340px;
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

const StyledSignupBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    background-color: #2E3057;
    color: #ffffff;
    font-weight: 600;
    font-size: 18px;
    border: 1px solid #2E3057;
    margin-top: 40px;
    margin-left: auto;
    &:hover {
      background-color: #2E3057;
    }
  }
  
`;

const StyledSignupCopyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: #C0C3E5;
`
export default SignupPage;
