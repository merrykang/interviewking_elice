import styled from "styled-components";
import { Link } from "@mui/material";
import React from 'react';
import StudyListItem from "../../components/layout/StudyListItem";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import PencilIconSrc from "../../img/pencil_mint.svg";
import { getInfoAllStudyData } from "../../api/api-study";

const StudyList = (): JSX.Element => {
  type StudyData = {
    id: number,
    title: string,
    headcount: number,
    start: string,
    end: string,
    deadline: string,
    master: string
  }

  const [studyData, setStudyData] = React.useState<StudyData[]>([]);

  React.useEffect(() => {
    getInfoAllStudyData()
      .then((response) => {
        console.log(response.data);
        setStudyData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
      <CommonContainer>
          <StudyListTopArea>
            
              <StyledTitleText>스터디 찾기</StyledTitleText>
              <StyledSubTextThin>원하는 스터디를 찾고 가입해보세요.</StyledSubTextThin>

              <StudyListInputArea>
                  <StyledSelect name="" id="StudyListSort">
                    <option value="recent">최신순</option>
                    <option value="ing">모집중</option>
                    <option value="done">모집완료</option>
                  </StyledSelect>
                  <StyledInput type="text" name="" id="" placeholder="검색하기" />
                  <StyledInputBtn>
                    <StyledIcon src={PencilIconSrc} />
                  </StyledInputBtn>
                  <CommonButton>
                      <ButtonText>스터디 만들기</ButtonText>
                  </CommonButton>
              </StudyListInputArea>
              
          </StudyListTopArea>

          <StudyListItemArea>
          {studyData.map((study,index) => (
              <StudyListItem
               key={index}
               id={study.id}
               title={study.title}
               // currentParticipants={study.currentParticipants}
               maxParticipants={study.headcount}
               startDate={study.start}
               endDate={study.end}
               recruitDeadline={study.deadline}
               master={study.master}
               />
          ))}
          </StudyListItemArea>
            
      </CommonContainer>
  );
};

export default StudyList;

const CommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;
const StudyListTopArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StudyListInputArea = styled.div`
  width: 620px;
  display: flex;
  justify-content: space-between;
`;
const StyledTitleText = styled.p`
  height: fit-content;
  ${fonts.TitleText}
  color: ${colors.main_navy};
  margin: 0 30px 0 0;
  `;
const StyledSubTextThin = styled.p`
  width: 439px;
  height: fit-content;
  font-size: 18px;
  font-weight: light;
  color: ${colors.main_gray};
  margin: 0;
`;

const CommonButton = styled.div`
  width: 132px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  background-color: ${colors.main_mint};
`;
const ButtonText = styled.p`
  font-size: 18px;
  margin-top: 11px;
  border-radius: 10px;
`;

const StudyListItemArea = styled.div`
  width: 1270px;
  height: 945px;
  margin: 30px 0 40PX 0;
  display: grid;
  grid-auto-rows: 295px;
  grid-template-columns: 298px 298px 298px 298px;
  grid-row-gap: 30px;
  grid-column-gap: 25px;
`;

const StyledSelect = styled.select`
  width: 133px;
  height: 45px;
  margin: 0;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  padding-left: 15px;
  color: ${colors.main_navy};
  ${fonts.SubTextThin}
`
const StyledInput = styled.input`
  width: 325px;
  height: 45px;
  margin: 0;
  border: solid 1px ${colors.main_navy};
  box-sizing: border-box;
  border-radius: 10px;
  padding-left: 15px;
  color: ${colors.back_navy};
  ${fonts.SubTextThin}
`
const StyledInputBtn = styled.button`
  background: none;
  border: none;
  margin-left: -50px;
`
const StyledIcon = styled.img`
  width: 27px;
  height: 27px;
`

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
