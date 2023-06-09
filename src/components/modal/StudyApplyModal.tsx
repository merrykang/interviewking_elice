import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styled from "styled-components";
import StudyApplyList from "./StudyApplyList";
import { Link } from "react-router-dom";
import { dateFomatting } from "../../utils/dateFomatting";
import { TitleText } from "../../constants/fonts";
import { colors } from "../../constants/colors";

type StudyApplyModalProps = {
  studyId: number;
};
const StudyApplyModal: React.FC<StudyApplyModalProps> = ({ studyId }) => {
  // 데이터 불러오는 부분
  // console.log(getStudyData());

  // 스터디 더미데이터인데 studyId로 aixos.get 요청 보내야함.
  const studyData = {
    title: "SAFFY 면접 스터디",
    period: "2023-05-30 ~ 2023-06-08",
    deadline: "2023-06-09",
    headcount: 4,
    study_id: 1,
    study_name: "interview king",
    content: "우리 스터디는 ~~을 목표로 하고, ...을 규칙으로 함",
    chat_link:
      "https://us05web.zoom.us/j/83754399005?pwd=QWRMY0I4VjhkWkhtdHdydkhTM0dLUT09",
    status: 1,
    currentCount: 2,
    studyLeader: "채진짱",
  };

  //받아온 스터디의 데이터 분해구조 할당
  const {
    title,
    period,
    deadline,
    headcount,
    currentCount,
    study_id,
    studyLeader,
    study_name,
    content,
    chat_link,
    status,
  } = studyData;

  //취소버튼 이미지 링크
  const imageSrc = "./cancel-button.png";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  /** 모달을 닫는 함수인데 preventDefault로 event 내용 다 없애야 하는지..? */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <StyledBox>
          <StyledContainer>
            <StyledTopContainer>
              <StyledTitleText>스터디 신청하기</StyledTitleText>
              <StyledCancleImg src={imageSrc} alt="Cancel Button" />
            </StyledTopContainer>
            <StyledTitleTextNavy>{title}</StyledTitleTextNavy>
            <StudyApplyList
              period={dateFomatting(period)}
              deadline={dateFomatting(deadline)}
              currentCount={currentCount}
              headCount={headcount}
              studyLeader={studyLeader}
            />
            <TextInput placeholder="한 줄 소개를 입력하시오. (60자 이내)" />
            <StyledBottom>
              <BottomContainer>
                <StyledP>스터디장의 승인 후 가입이 가능합니다.</StyledP>
                <InfoContainer>
                  <StyledP>
                    신청 시 입력한 한 줄 소개와 등록된 자기소개서가 스터디장에게
                    발송됩니다.
                  </StyledP>
                  <StyledA to="/mypage-modify">
                    자기소개서 등록을 안 하셨나요?
                  </StyledA>
                </InfoContainer>
              </BottomContainer>
              <StyledApplyButton>신청하기</StyledApplyButton>
            </StyledBottom>
          </StyledContainer>
        </StyledBox>
      </Modal>
    </div>
  );
};

export default StudyApplyModal;
const StyledBox = styled(Box)`
  height: 594px;
  width: 1004px;
  background-color: #f1f4ff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  display: flex;
`;

const StyledTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledContainer = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
`;

const StyledTitleText = styled.p`
  margin: 0px;
  margin-bottom: 22px;
  ${TitleText}
  color: ${colors.main_mint}
`;

const StyledTitleTextNavy = styled.p`
  margin: 0px;
  margin-bottom: 22px;
  ${TitleText}
  color: ${colors.main_navy}
`;

const TextInput = styled.textarea`
  width: 923px;
  height: 172px;
  border-radius: 10px;
  font-size: 18px;
`;

const StyledP = styled.p`
  font-size: 14px;
  margin: 0;
  margin-right: 10px;
`;

const StyledA = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #000;
  text-decoration: underline;
`;

const StyledApplyButton = styled.button`
  margin-left: auto;
  background-color: #00e595;
  border-radius: 10px;
  width: 132px;
  height: 45px;
  font-size: 16px;
  border: 0px;
`;

const StyledCancleImg = styled.img`
  width: 23px;
  height: 23px;
`;

const BottomContainer = styled.div``;
const StyledBottom = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;
