import styled from "styled-components";

export const Navigation = styled.nav`
  background-color: ${({ theme }) => theme.navigationBackground};
  margin-top: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};

  a {
    color: ${({ theme }) => theme.textColor};
    text-decoration: none;

    & + a {
      margin-left: 16px;
    }
  }
`;

export const Container = styled.section`
  position: relative;
`;
