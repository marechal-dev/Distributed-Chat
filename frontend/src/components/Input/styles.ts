import styled from 'styled-components';

export const Container = styled.div`
  color: ${({ theme }) => theme.COLORS.WHITE};

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;

  input {
    background-color: ${({ theme }) => theme.COLORS.DC_900};
    color: ${({ theme }) => theme.COLORS.WHITE};

    padding: 1.2rem 1.4rem;
    border: none;
    border-radius: 0.8rem;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.COLORS.DC_100};
    }

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.DC_100};
    }
    
  }
`