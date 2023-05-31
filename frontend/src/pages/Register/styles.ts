import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;

  > h1 {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: clamp(3.2rem, 2.2rem + 3.125vw, 4.2rem);
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  @media (min-width: 769px) {
    padding: 0 7vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    > h1 {
      margin-top: -2rem;
      flex-shrink: 0;
      font-size: clamp(2.6rem, -3.8rem + 10vw, 4.2rem);
    }
  }

  @media (max-width: 768px) {
    padding-top: 16vh;
  }
`;

export const Form = styled.form`
  margin: 0 auto;
  padding: 64px;
  border-radius: 1.6rem;

  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;

  max-width: 50rem;


  > a {
    margin: 0 auto;
  }

  > h2 {
    display: none;
  }


  @media (min-width: 769px) {
    width: min(95%, 476px);

    background-color: ${({ theme }) => theme.COLORS.DC_600};
    margin: 0;

    h2 {
      display: block;
      text-align: center;

    }
  }`