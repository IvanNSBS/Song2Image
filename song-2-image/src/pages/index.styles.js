import styled from "styled-components";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;

export const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 52px;
  margin-top: 40px;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const StyledTitle = styled.h1`
  line-height: 1.15;
  font-size: 4rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  max-width: 700px;
  align-items: center;
  margin: 100px auto 10px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  gap: 10px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  margin-top: 40px;
`;
