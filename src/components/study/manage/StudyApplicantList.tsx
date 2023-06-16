import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import UserInfoModal from "../../modal/UserInfoModal";
import { useQuery } from "react-query";
import { getStudyAccept, putAcceptStudy } from "../../../api/api-study";
import { useQueryClient } from "react-query";
type StudyApplicantListProps = {
  studyId: string;
};

interface StudyAcceptData {
  _id: string;
  study_id: string;
  user_id: string;
  user_name: string;
  is_leader: boolean;
  goal: string;
  accept: number;
}

const StudyApplicantList = ({ studyId }: StudyApplicantListProps) => {
  const queryClient = useQueryClient();
  const apply = 0;
  // 신청 수락
  const accept = 1;
  // 신청 거절
  const unAccept = 2;
  const onAcceptButton = async (index: number) => {
    const userId = studyApplytData[index].user_id;
    await putAcceptStudy(
      String(localStorage.getItem("token")),
      studyId,
      userId,
      accept
    );
    queryClient.invalidateQueries(["studyApplytData"]);
  };
  const onDeleteButton = async (index: number) => {
    const userId = studyApplytData[index].user_id;
    await putAcceptStudy(
      String(localStorage.getItem("token")),
      studyId,
      userId,
      unAccept
    );
    queryClient.invalidateQueries(["studyApplytData"]);
  };

  const {
    data: studyApplytData,
    isLoading,
    isError,
  } = useQuery(["studyApplytData"], () =>
    getStudyAccept(studyId, apply).then((response) => response.data)
  );

  console.log(`studyApplytData:`, studyApplytData);
  const members = studyApplytData;
  const [userInfoModalOpen, setUserInfoModalOpen] = React.useState(false);

  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }

  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching data</div>;
  }
  return (
    <>
      {members.map((member: StudyAcceptData, index: number) => (
        <CardContainer key={index}>
          <CardContent>
            <StyledName onClick={handleOpenUserInfoModal}>
              {member.user_name}
            </StyledName>
            <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
              <UserInfoModal
                userId={member.user_id}
                handleModalClose={handleCloseUserInfoModal}
              />
            </Modal>
            <StyledDescription>{member.goal}</StyledDescription>
          </CardContent>
          <StyledCommonButton
            backgroundColor={colors.main_mint}
            onClick={() => onAcceptButton(index)}
          >
            신청 수락
          </StyledCommonButton>
          <StyledCommonButton
            backgroundColor={colors.main_red}
            onClick={() => onDeleteButton(index)}
          >
            회원 거절
          </StyledCommonButton>
        </CardContainer>
      ))}
    </>
  );
};
export default StudyApplicantList;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: ${colors.main_navy};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: ${colors.back_navy}; /* 수정된 부분 */
  border-radius: 10px; /* 수정된 부분 */
`;

const StyledName = styled.p`
  font-weight: bold;
  margin-right: 10px;
  margin-left: 20px;
  cursor: pointer;
`;

const StyledDescription = styled.p`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 100px;
`;
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  cursor: pointer;
  margin-left: 20px;
  width: 132px;
  height: 45px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.main_navy};
    color: white;
  }
  ${fonts.SubText}
`;
