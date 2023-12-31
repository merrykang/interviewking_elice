import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button, Typography, TextField, Grid, Box } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import axios from "axios";

type userDate = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
};

// axios
//   .get(`http://34.22.79.51:5000/api/user/mypage/${userId}`)
//   .then((response) => {
//     // 성공적으로 데이터를 받아왔을 때 처리할 로직 작성
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // 에러가 발생했을 때 처리할 로직 작성
//     console.error(error);
//   });

const MenuButton = () => {
  return (
    <>
      <Grid item>
        <StyledDeleteButton variant="contained" sx={{ gap: "5px" }}>
          회원탈퇴
        </StyledDeleteButton>
      </Grid>
      <Grid item>
        <StyledModifyButton variant="contained">수정하기</StyledModifyButton>
      </Grid>
    </>
  );
};
const Dummy = {
  name: "박세진",
  email: "cobaltcyan.park@gmail.com",
  password: "tpwls1234",
  privacy_use_yn: "Y",
  marketing_use_yn: "N",
  intro_yn: "00030001_202305300019.pdf", // 또는 NULL
  phone_number: "010-4916-4244",
  admin_yn: false,
  dts_insert: "202305291250",
  dts_update: "202306100421",
};

const Modify = () => {
  const [userData, setUesrDate] = useState(Dummy);
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item>
          <StyledTitle variant="h5">내 정보수정</StyledTitle>
        </Grid>
        <Grid item>
          <StyledSubTitle variant="subtitle1">
            나의 회원정보를 수정합니다.
          </StyledSubTitle>
        </Grid>
      </Grid>
      {/**  페이지내용 */}
      <form>
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          sx={{ marginTop: "7px" }}
        >
          <Grid item xs={2}>
            <StyledInfoName>이름</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={userData.name}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>연락처</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={userData.phone_number}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>아이디</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={userData.email}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>비밀번호</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={userData.password}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>비밀번호확인</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={2}>
            <StyledInfoName>자기소개서첨부</StyledInfoName>
          </Grid>
          <Grid item xs={8}>
            <StyledTextField variant="outlined" type="file" fullWidth />
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end">
            <StyledFindButton variant="contained">파일찾기</StyledFindButton>
          </Grid>

          {/* 버튼1, 버튼2 */}
          <Grid
            container
            spacing={1}
            sx={{ marginTop: "7px" }}
            justifyContent="flex-end"
          >
            <MenuButton />
          </Grid>
        </Grid>
      </form>
    </StyledContainer>
  );
};
export default Modify;

const StyledContainer = styled(Box)`
  && {
    width: 66.1%;
    max-width: 1270px;
    margin-left: 325px;
    padding-left: 0;
  }
`;
// 내정보수정 타이틀 스타일
const StyledTitle = styled(Typography)`
  && {
    ${fonts.TitleText}
    color:${colors.main_mint}
  }
`;
// 내정보를 수정하세요 서브타이틀 스타일
const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
  }
`;
//각정보타이틀 스타일지정
const StyledInfoName = styled(Typography)`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_black}
  }
`;
//텍스트필드 스타일지정
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
  },
}));

//버튼 스타일
const StyledFindButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    padding: auto;
    ${fonts.SubText}
    background-color: ${colors.dark_navy};
    color: ${colors.back_navy};
    &:hover {
      background-color: ${colors.back_navy};
      color: ${colors.dark_navy};
    }
  }
`;

const StyledModifyButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    ${fonts.SubText}
    padding: auto;
    background-color: ${colors.main_mint};
    color: ${colors.main_navy};
    &:hover {
      background-color: ${colors.main_navy};
      color: ${colors.main_mint};
    }
  }
`;
const StyledDeleteButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    ${fonts.SubText}
    padding: auto;
    background-color: ${colors.main_red};
    color: ${colors.back_navy};
    &:hover {
      background-color: ${colors.back_navy};
      color: ${colors.main_red};
    }
  }
`;
