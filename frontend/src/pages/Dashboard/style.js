import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  background: var(--color-primary);
`;

export const Title = styled.h1`
  margin: 0px;
  padding: 0px;
  font-size: 24px;
  margin-left: 28px;
  color: var(--color-text-clear);
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 24px;
  color: var(--color-text-clear);

  @media (max-width: 576px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;
export const Container = styled.div`
  padding: 15px;
  display: flex;
  width: 100vw;
  height: 128px;
  max-width: 656px;
  max-height: 128px;
  justify-content: center;
  /* align-items: center; */
`;
export const Menu = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
  }
  @media (max-width: 992px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
  }
`;

export const ButtonMenu = styled.button`
  border: 0;
  margin: 0;
  outline: none;
  background: none;
`;

export const Picture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--color-button);
  color: var(--color-text-clear);
`;

export const Logout = styled.a`
  font-weight: lighter;
  text-decoration: none;
  margin-left: 14px;
  color: var(--color-text-clear);
  cursor: pointer;
  @media (max-width: 576px) {
    margin-right: 25px;
  }
  @media (max-width: 768px) {
    margin-right: 25px;
  }
  @media (max-width: 992px) {
    margin-right: 25px;
  }
`;

export const Main = styled.main`
  margin-top: 40px;
  margin-left: 20%;
  @media (max-width: 576px) {
    margin-left: 5%;
  }
  @media (max-width: 768px) {
    margin-left: 5%;
  }
  @media (max-width: 992px) {
    margin-left: 5%;
  }
`;

export const Subtitle = styled.h1`
  margin: 0;
  padding: 0;
  margin-bottom: 2%;
  color: var(--color-text);
  font-weight: normal;
  @media (max-width: 320px) {
    font-size: 24px;
  }
`;
export const Table = styled.table``;
export const TableTitle = styled.th`
  padding: 15px;
  text-align: center;
`;
export const SearchInput = styled.input`
  border: 1px solid var(--color-button);
  padding: 5px;
`;
export const SearchButton = styled.button`
  margin: 0;
  padding: 0%;
  border: none;
  border: 1px solid var(--color-button);
  background: var(--color-button);
  color: #fff;
  padding: 5px;
`;
export const FormSearch = styled.form`
  display: flex;
  /* flex-direction: column; */
  justify-content: left;
  margin: 1%;
`;
export const TableItem = styled.td`
  color: #333;
  margin: 25px;
  text-align: center;
  border: 1px solid #000;
`;
export const Tables = styled.div`
  margin: 15px;
`;
export const ContainerTables = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0px;
`;
export const TableItemText = styled.span`
  margin: 5px;
  text-align: center;
`;
export const TableHeader = styled.thead`
  background: var(--color-button);
  color: var(--color-text-clear);
`;
export const TableBody = styled.tbody``;
export const TextOfResult = styled.span`
  color: var(--color-text);
  font-size: 24px;

  @media (max-width: 576px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export const ResultsAndData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 60px;
`;
export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.2fr);
  width: 100%;
  height: 100%;
  gap: 32px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 0.2fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 0.2fr);
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(1, 0.2fr);
  }
`;
export const Card = styled.section`
  background: var(--color-primary);
  width: 100vw;
  height: 128px;
  max-width: 328px;
  max-height: 128px;
  display: flex;
  border-radius: 16px;
  @media (max-width: 320px) {
    max-width: 280px;
    max-height: 128px;
  }
`;
export const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 36px;
  margin-top: 12px;
  color: var(--color-text-clear);
`;
export const CardText = styled.span`
  font-size: 24px;
`;
export const CardTotal = styled.span`
  margin-top: 42px;
  font-size: 24px;
`;
export const MenuDashboard = styled.div`
  height: 100%;
  width: 100%;
  transition: ease 0.6s;
  background: var(--color-primary);
`;
export const UserMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 25px;
`;
