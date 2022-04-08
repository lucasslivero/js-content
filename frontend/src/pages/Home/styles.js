import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};

  strong {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    border: ${({ theme }) => `2px solid ${theme.colors.primary.main}`};
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

  .sort-button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
      align-self: flex-end;
    }

    img {
      transform: rotate(${({ orderBy }) => (orderBy === 'asc' ? '180deg' : '0deg')});
      transition: transform 0.2s ease-in;
    }
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    .contact-name {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }

  & + & {
    margin-top: 18px;
  }

  &:last-child {
    margin-bottom: 18px;
  }
`;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 24px;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0,0,0 0.04);
    padding: 0 16px;
    outline: 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;
    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: inline-block;
      margin-bottom: 8px;
    }
  }
`;

export const EmptyListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-top: 16px;
    text-align: center;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const SearchNotFoundContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
