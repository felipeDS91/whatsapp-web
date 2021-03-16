import styled from 'styled-components';

interface INav {
  isOpened: boolean;
}

export const Container = styled.div`
  background: #fff;

  @media print {
    display: none;
  }
`;

export const Nav = styled.nav<INav>`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 100vw;
  z-index: 1;

  aside {
    margin-left: auto;
  }

  img {
    padding: 0 20px;
  }

  ul {
    float: right;
    margin-right: 20px;
    z-index: 1;
    li {
      display: inline-block;
      line-height: 64px;
      margin: 0 1px;
      a {
        color: #666666;
        font-size: 17px;
        font-weight: bold;
        text-transform: uppercase;
        padding: 22px;
        border-radius: 0px;
      }
    }
  }

  a.active,
  a:hover {
    background: #dadada;
    transition: 0.5s;
  }

  @media (max-width: 952px) {
    label.logo {
      font-size: 30px;
      padding-left: 50px;
    }
    nav ul li a {
      color: #333;
      font-size: 16px;
    }
  }

  @media (max-width: 858px) {
    ul {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: #5bbf4a;
      top: 64px;
      left: ${props => (props.isOpened ? '0' : '-100vw')};
      text-align: center;
      transition: all 0.5s;
    }
    ul li {
      display: block;
      margin: 50px 0;
      line-height: 30px;
    }
    ul li a {
      color: #333;
      font-size: 20px;
    }
    a:hover,
    a.active {
      background: none;
      color: #dadada;
    }
  }
`;

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: space-around;
  width: 100%;
`;

export const MenuButton = styled.button`
  font-size: 30px;
  color: white;
  float: right;
  line-height: 64px;
  padding-left: 20px;
  cursor: pointer;
  display: none;
  border: 0;
  background: transparent;

  @media (max-width: 858px) {
    display: block;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-right: 20px;
  padding-left: 20px;
  width: 114px;
  border-left: 1px solid #d6d7da;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
    }

    button {
      float: right;
      border: 0;
      background: transparent;
      display: block;
      margin-top: 2px;
      align-self: right;
      font-size: 12px;
      color: #5bbf4a;
    }
  }
`;
