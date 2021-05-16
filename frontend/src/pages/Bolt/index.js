import React, { useState, useEffect } from 'react';
import {
	Header,
	Title,
	Main,
	Table,
	TableHeader,
	TableHeaderItem,
	TableMain,
	TableItem,
	ButtonSubmit,
	TableFooter,
} from './style';
import api from '../../services/api';
import Autocomplete from './components/Autocomplete';

export default function Bolt() {
	const [textState, setTextState] = useState('');
	const [TotalDeGanhos, setGanhosTotais] = useState({
		price: '0,00',
		gived: '0,00',
		geral: '0,00',
	});
	const [Data, setData] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await api.get('/bot/bolt/driver/lucros', {
				headers: {
					name: textState,
					key: `${process.env.REACT_APP_REGISTER_KEY}`,
				},
			});
			var totalPrice = 0.0;
			var totalGived = 0.0;
			for (let i = 0; i < response.data.length; i++) {
				const element = response.data[i];
				totalPrice += parseFloat(element.price.replace(',', '.'));
				totalGived += parseFloat(element.gived.replace(',', '.'));
			}
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'EUR',
				minimumFractionDigits: 2,
			});
			setGanhosTotais({
				price: formatter.format(totalPrice),
				gived: formatter.format(totalGived),
				geral: formatter.format(totalPrice + totalGived),
			});
			setData(response.data);
			console.log(Data[0]);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Header>
				<Title>Relatorio Bolt</Title>
			</Header>
			<Main>
				<h2>Dados</h2>
				<form onSubmit={handleSubmit}>
					<Autocomplete textState={textState} setTextState={setTextState} />
					<ButtonSubmit type="submit">Pedir relatorio</ButtonSubmit>
				</form>

				<Table>
					<TableHeader>
						<tr>
							<TableHeaderItem>Nome do driver</TableHeaderItem>
							<TableHeaderItem>Ganhos</TableHeaderItem>
							<TableHeaderItem>Gorjetas</TableHeaderItem>
							<TableHeaderItem>Total de Ganhos</TableHeaderItem>
						</tr>
					</TableHeader>
					<TableMain>
						{Data.map((item) => (
							<tr>
								<TableItem>{item.name}</TableItem>
								<TableItem>{item.price}</TableItem>
								<TableItem>{item.gived}</TableItem>
							</tr>
						))}
					</TableMain>
					<TableFooter>
						<tr>
							<TableItem>Total</TableItem>
							<TableItem>{TotalDeGanhos.price}</TableItem>
							<TableItem>{TotalDeGanhos.gived}</TableItem>
							<TableItem>{TotalDeGanhos.geral}</TableItem>
						</tr>
					</TableFooter>
				</Table>
			</Main>
		</>
	);
}
