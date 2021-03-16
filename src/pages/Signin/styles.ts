import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  width: 100%;
  max-width: 430px;

  align-items: center;
  margin: 0 auto;

  form {
    padding: 0px 22px 22px 22px;
    margin: 30px 0;
    width: 350px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 27px;
    }

    a {
      margin-top: 12px;
      color: #444;
      font-weight: bold;
      font-size: 14px;
    }

    button {
      margin-top: 18px;
    }
  }
`;
