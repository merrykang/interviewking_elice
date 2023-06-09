import React, { useState, useEffect } from "react";
import styled from "styled-components";

import StyledIcon from "./Img";
import PeopleIconSrc from "../../img/people_navy.svg";


type StudyListProps = {
  id: number,
  title: string,
  // currentParticipants: number,
  maxParticipants: number,
  startDate: string,
  endDate: string,
  recruitDeadline: string,
  master: string
}

const StudyListItem: React.FC<StudyListProps> = ({
  id,
  title,
  //currentParticipants,
  maxParticipants,
  startDate,
  endDate,
  recruitDeadline,
  master,
}) => {
  return (
        <StyledStudyListContainer key={id}>
          <StyledStudyListNavyArea>
            <StyledStudyTagArea>
              <StyledStudyRecruitTag>모집 중</StyledStudyRecruitTag>
              <StyledStudyNewTag>NEW</StyledStudyNewTag>
            </StyledStudyTagArea>
            <StyledStudyName>{title}</StyledStudyName>
          </StyledStudyListNavyArea>
  
          <StyledStudyListWhiteText>
            <StyledStudyPeopleArea>
              <StyledIcon src={PeopleIconSrc} />
              <StyledStudyListPeopleText>
                0 / {maxParticipants} 명
              </StyledStudyListPeopleText>
            </StyledStudyPeopleArea>
  
            <StyledStudyDateArea>
              <StyledStudyListDateText>
                진행 기간 | {startDate} ~ {endDate}
              </StyledStudyListDateText>
              <StyledStudyListDateText>
                모집 마감 | {recruitDeadline}
              </StyledStudyListDateText>
            </StyledStudyDateArea>
  
            <StyledStudyMaster>{master}</StyledStudyMaster>
          </StyledStudyListWhiteText>
        </StyledStudyListContainer>
  );

  
};

export default StudyListItem

const StyledStudyListContainer = styled.div`
  width: 295px;
  height: 295px;
  border: solid 1px #DADADA;
  border-radius: 15px;
  background-color: #fff;
  margin: 0;
`;
const StyledStudyListNavyArea = styled.div`
  width: 295px;
  height: 124px;
  border: solid 1px #2E3057;
  border-radius: 15px 15px 0 0;
  background-color: #2E3057;
`;
const StyledStudyTagArea = styled.div`
  width: fit-content;
  height: 20px;
  font-size: 12px;
  margin: 35px 0 0 35px;
`;
const StyledStudyRecruitTag = styled.div`
  width: fit-content;
  height: fit-content;
  display: inline;
  color: #F1F4FF;
  border: solid 1px #F1F4FF;
  border-radius: 15px;
  padding: 1px 10px;
  margin-right: 8px;
`;
const StyledStudyNewTag = styled.div`
  width: fit-content;
  height: fit-content;
  display: inline;
  color: #00E595;
  border: solid 1px #00E595;
  border-radius: 15px;
  padding: 1px 10px;
`;
const StyledStudyName = styled.p`
  width: 225px;
  height: fit-content;
  font-size: 24px;
  font-weight: semibold;
  color: #fff;
  margin-left: 35px;
  margin: 13px 0 0 35px;
  overflow: hidden;
  white-space:nowrap;
`;
const StyledStudyListWhiteText = styled.div`
  width: 225px;
  height: fit-content;
  margin: 20px 0 0 35px;
`;
const StyledStudyPeopleArea = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: semibold;
`;
const StyledStudyDateArea = styled.div`
  height: 44px;
  font-size: 24px;
  font-weight: semibold;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;
const StyledStudyListPeopleText = styled.p`
 font-size: 14px;
 font-weight: medium;
 color: black;
 margin: 0 0 0 8px;
`;
const StyledStudyListDateText = styled.p`
 font-size: 14px;
 font-weight: medium;
 color: black;
 margin: 0;
`;
const StyledStudyMaster = styled.p`
 font-size: 14px;
 font-weight: medium;
 color: black;
 margin: 20px 0 0 0;
`;

