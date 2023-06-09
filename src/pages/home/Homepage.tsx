import React from "react";
import styled from "styled-components";
import StudyListItem from "../../components/layout/StudyListItem";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import PencilIconSrc from "../../img/pencil_mint.svg";
import { Style } from "@mui/icons-material";

const HomePage = (): JSX.Element => {
  const studyData = [{
    id: 1,
    title: "면접 스터디 1",
    currentParticipants: 3,
    maxParticipants: 8,
    startDate: "23.07.01",
    endDate: "23.07.31",
    recruitDeadline: "23.06.30",
    master: "정채진"
  },
  {
    id: 2,
    title: "면접 스터디 2",
    currentParticipants: 3,
    maxParticipants: 8,
    startDate: "23.07.01",
    endDate: "23.07.31",
    recruitDeadline: "23.06.30",
    master: "정채진"
  },
  {
    id: 3,
    title: "면접 스터디 3",
    currentParticipants: 3,
    maxParticipants: 8,
    startDate: "23.07.01",
    endDate: "23.07.31",
    recruitDeadline: "23.06.30",
    master: "정채진"
  },
  {
    id: 4,
    title: "면접 스터디 4",
    currentParticipants: 3,
    maxParticipants: 8,
    startDate: "23.07.01",
    endDate: "23.07.31",
    recruitDeadline: "23.06.30",
    master: "정채진"
  }]

  return (
    <StyledCommonContainer>

      <StyledItemNameArea>
        <StyledTitleText>새로 올라온 스터디</StyledTitleText>
      </StyledItemNameArea>

      <StudyListItemArea>
      {studyData.map((study) => (
          <StudyListItem
           id={study.id}
           title={study.title}
           // currentParticipants={study.currentParticipants}
           maxParticipants={study.maxParticipants}
           startDate={study.startDate}
           endDate={study.endDate}
           recruitDeadline={study.recruitDeadline}
           master={study.master}
           />
      ))}
      </StudyListItemArea>
      
      <StyledMainStudyBtnArea>      
        <StyledMainStudyBtn>

          <StyeldBtnTextArea>

            <StyeldBtnTitleArea>
              <StyledIcon src={PencilIconSrc} />
              <StyledMainBtnTitle>스터디 참여하기</StyledMainBtnTitle>
            </StyeldBtnTitleArea>

            <StyledMainBtnSub>
              참여하고 싶은 스터디를 찾고, 자신있는 면접을 준비해보세요!
            </StyledMainBtnSub>
          </StyeldBtnTextArea>


        </StyledMainStudyBtn>

        <StyledMainStudyBtn>

          <StyeldBtnTextArea>

            <StyeldBtnTitleArea>
              <StyledIcon src={PencilIconSrc} />
              <StyledMainBtnTitle>
                스터디 만들기
              </StyledMainBtnTitle>
            </StyeldBtnTitleArea>

            <StyledMainBtnSub>
              알맞는 스터디가 없다면 직접 스터디를 개설해보세요!
            </StyledMainBtnSub>
          </StyeldBtnTextArea>

        </StyledMainStudyBtn>
      </StyledMainStudyBtnArea>    

      <StyledItemNameArea>
        <StyledTitleText>커뮤니티 소식</StyledTitleText>
      </StyledItemNameArea>

      <StyledMainCommunityArea>

      </StyledMainCommunityArea>

    </StyledCommonContainer>

    
  );
};

export default HomePage;


const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;
const StyledItemNameArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StyledTitleText = styled.p`
  height: fit-content;
  color: ${colors.main_navy};
  margin: 0 30px 0 0;
  ${fonts.TitleText}
`;
const StudyListItemArea = styled.p`
  width: 1270px;
  height: 295px;
  margin: 30px 0 40PX 0;
  display: grid;
  grid-auto-rows: 295px;
  grid-template-columns: 298px 298px 298px 298px;
  grid-row-gap: 30px;
  grid-column-gap: 25px;
`;


const StyledMainStudyBtnArea = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledMainStudyBtn = styled.div`
  width: 620px;
  height: 134px;
  border: solid 1px ${colors.main_mint};
  border-radius: 15px;
`
const StyeldBtnTextArea  = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 35px 0 0 40px;
`
const StyeldBtnTitleArea = styled.p`
  height: fit-content;
  display: flex;
  margin: 0;
`
const StyledIcon = styled.img`
  width: 27px;
  height: 27px;
`
const StyledMainBtnTitle = styled.p`
  margin: 2px 0 20px 20px;
  ${fonts.SubText}
  font-size: 20px;
`
const StyledMainBtnSub = styled.p`
  ${fonts.SubTextThinSmall}
  margin: 0 0 0 0;
`

const StyledMainCommunityArea = styled.div`
  height: 300px;
`