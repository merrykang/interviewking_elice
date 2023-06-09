import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

const CommunityCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<File[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) as File[] : [];
    setFileList(selectedFiles);
  };

  const handleSubmit = () => {
    // 글쓰기 버튼 클릭 시 처리 로직
    // API 호출 또는 상태 업데이트 등
    console.log('Submit');
  };

  const handleDelete = () => {
    // 글삭제 버튼 클릭 시 처리 로직
    // API 호출 또는 상태 업데이트 등
    console.log('Delete');
  };

  return (
    <StyledCommonContainer>

      <StyledCreatePageContainer>
        <StyledTitleWrapper>
          <StyledCreatePageTitle>커뮤니티 글 쓰기</StyledCreatePageTitle>
          <StyledCreatePageSubtitle>회원들과 정보를 공유해보세요.</StyledCreatePageSubtitle>
        </StyledTitleWrapper>
        <StyledInputWrapper>
          <StyledTitle>제목</StyledTitle>
          <StyledInput value={title} onChange={handleTitleChange} placeholder="스터디 이름을 입력하세요." />
        </StyledInputWrapper>

        <StyledInputWrapper className="second-input-wrapper">
          <StyledTitle>내용</StyledTitle>
          <StyledTextarea value={content} onChange={handleContentChange} placeholder="스터디 설명을 입력하세요." />
        </StyledInputWrapper>

        <StyledFileInputWrapper>
          <StyledFileInputContainer>
            <StyledTitle>파일 첨부</StyledTitle>
            <StyledSubtitle>파일을 첨부하세요.</StyledSubtitle>
            <FileInput type="file" id="fileInput" onChange={handleFileChange} />
            <StyledFileButton htmlFor="fileInput">파일찾기</StyledFileButton>
          </StyledFileInputContainer>
          <FileList>
            {fileList.map((file, index) => (
              <FileListItem key={index}>
                <FileAttachment href={URL.createObjectURL(file)} download>
                  {file.name}
                </FileAttachment>
              </FileListItem>
            ))}
          </FileList>
        </StyledFileInputWrapper>

        <StyledDelButton onClick={handleDelete}>삭제</StyledDelButton>
        <StyledFileButtonWrapper>
          <StyledCreateButton onClick={handleSubmit}>글쓰기</StyledCreateButton>
        </StyledFileButtonWrapper>
      </StyledCreatePageContainer>

    </StyledCommonContainer>
  );
};

const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;

const StyledCreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitleWrapper = styled.div`
  margin: 60px 0 25px;
  width: 1270px;
  display: flex;
  align-items: flex-end; /* 폰트를 바닥에 같은 높이로 위치 */
`;

const StyledCreatePageTitle = styled.p`
  height: fit-content;
  font-family: 'establish Retrosans';
  color: ${colors.main_mint};
  font-size: 32px;
  font-weight: 400;
  margin: 0;
  margin-right: 40px;
`;

const StyledCreatePageSubtitle = styled.p`
  font-weight: 300;
  font-size: 18px;
  margin: 0;
`;

const StyledTitle = styled.div`
  height: fit-content;
  font-size: 20px;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 1107px;
  height: 45px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  line-height: 45px;
  padding-left: 20px;

  &::placeholder {
    color: #C0C3E5;
  }
`;
const StyledTextarea = styled.textarea`
  width: 1107px;
  height: 400px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  padding: 20px;
  resize: none;

  &::placeholder {
    color: #C0C3E5;
  }
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 20px;
  width: 1270px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* &.second-input-wrapper input[type="text"] {
    height: 400px;
    padding: 20px;
  } */
  .second-input-wrapper {
    height: 400px;
    position: relative;

    ${StyledInput} {
      position: absolute;
      top: -20px;
      left: 0;
    }
  }
`;

const StyledFileInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledFileInputWrapper = styled.div`
  width: 1270px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  ${StyledTitle} {
    margin-right: 77px;
    width: max-content;
    display: inline-block;
  }
`;

const StyledSubtitle = styled.p`
  margin: 0;
  width: 960px;
  height: 45px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  color: ${colors.darkgray_navy};
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  line-height: 45px;
  padding-left: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const StyledFileButton = styled.label`
  width: 132px;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  background-color: #2E3057;
  border-radius: 10px;
  text-align: center;
  line-height: 45px;
  color: #fff;
  cursor: pointer;
  margin-left: 15px;
`;

const FileList = styled.ul`
  border: 1px solid #ddd;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 15px;
`;

const FileListItem = styled.li`
  margin-top: 15px;
`;

const FileAttachment = styled.a`
  display: block;
`;

const StyledFileButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1270px;
`
const StyledCreateButton = styled.button`
  padding: 10px 20px;
  background-color: #00E595 ;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #00057D;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 80px;
`;

const StyledDelButton = styled.button`
  color: #FF4F4F;
  font-size: 16px;
  font-weight: 300;
  border: none;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  width: 1270px;
  margin-bottom: 15px;
`

export default CommunityCreatePage;
