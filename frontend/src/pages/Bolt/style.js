import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	align-items: center;
	color: #fff;
	background-color: var(--color-primary);

	padding: 1%;
`;

export const Title = styled.span`
	font-weight: bold;
	font-size: 20px;
`;

export const Main = styled.main`
	margin: 1%;
`;

export const Table = styled.table``;

export const TableHeader = styled.thead`
	background: var(--color-button);
`;

export const TableHeaderItem = styled.th`
	padding: 8px;
	color: #fff;
`;

export const TableMain = styled.tbody``;

export const TableItem = styled.td`
	border: 1px solid #000;
	padding: 8px;
`;

export const ButtonSubmit = styled.button`
	border: 0px;
	color: #fff;
	padding: 0.5%;
	border-radius: 6px;
	margin-bottom: 8px;
	background-color: var(--color-button);
`;

export const TableFooter = styled.tfoot`
	background-color: var(--color-button);
	color: #fff;
`;
