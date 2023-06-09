import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #F1F4FF;
  padding-bottom: 50px;
`
const Divider = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid #909090;
`;

const StyledFooterContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬을 위한 수정 */
  width: 1270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFooterLogo = styled.div`
  height: fit-content;
  font-family: 'establish Retrosans';
  font-size: 32px;
  font-weight: 400;
  color: #C0C3E5;
`;

const StyledFooterInfoContainer = styled.div`
  display: flex;
`;

const StyledFooterInfo = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090;
  margin-left: 125px;
`;

const StyledFooterCopyright = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090; 
  margin-left: 80px;
  text-align: right;
`;

const Footer = () => {
  return (
    <Container>
      <Divider></Divider>
      <StyledFooterContainer>
        <StyledFooterLogo>
          면접왕
        </StyledFooterLogo>
        <StyledFooterInfoContainer>
          <StyledFooterInfo>
            footerfooterfooterfooter<br />
            footerfooterfooterfooterfooterfooterfooter<br />
            footerfooterfooter
          </StyledFooterInfo>
          <StyledFooterInfo>
            footerfooterfooterfooter<br />
            footerfooterfooterfooterfooterfooterfooter<br />
            footerfooterfooter
          </StyledFooterInfo>
        </StyledFooterInfoContainer>
        <StyledFooterCopyright>
          footerfooterfooterfooter<br />
          footerfooterfooter<br /><br />
          Copyright © 2023 SW4.CARCAR All Rights Reserved.
        </StyledFooterCopyright>
      </StyledFooterContainer>
    </Container>
  );
};

export default Footer;
