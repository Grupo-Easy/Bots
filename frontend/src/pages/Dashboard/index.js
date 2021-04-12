import React, { useState, useEffect, useRef } from 'react';
import {
	Header,
	Title,
	User,
	Picture,
	Logout,
	Menu,
	ButtonMenu,
	Main,
	Subtitle,
	ResultsAndData,
	TextOfResult,
	CardsGrid,
	Card,
	ContainerCard,
	CardText,
	CardTotal,
	MenuDashboard,
	UserMenu,
	Container,
	Table,
	TableTitle,
	TableHeader,
	TableBody,
	TableItem,
	TableItemText,
	ContainerTables,
	Tables,
	SearchInput,
	FormSearch,
	SearchButton,
	ItemMenu,
	MenuContainer,
} from './style';
import DataRange from '@wojtekmaj/react-daterange-picker';
import api from '../../services/api';
import icon from '../../images/FilterRight.svg';
import ReactMapGL, { Popup } from 'react-map-gl';
import './main.css';
import { Spinner } from 'react-bootstrap';

function Dashboard({ history }) {
	const [InitialLetter, setInitialLetter] = useState('');
	const [Username, setUsername] = useState('');
	const [Viagens, setViagens] = useState('0');
	const [Portagens, setPortagens] = useState('0,00');
	const [Combustivel, setCombustivel] = useState('0,00');
	const [Rendimento, setRendimento] = useState('0,00');
	const [Role, setRole] = useState('');
	const [ActiveMenu, setMenu] = useState(false);
	const [data, setData] = useState([new Date(), new Date()]);
	const [mapLoading, setMapLoading] = useState(true);
	const [rotas, setRotas] = useState([]);
	const [uberlist, setUberList] = useState([]);
	const [freenowlist, setFreeNowList] = useState([]);
	const [uberlistbackup, setUberListBackup] = useState([]);
	const [freenowlistbackup, setFreeNowListBackup] = useState([]);
	const [uberSearch, setUberSearch] = useState('');
	const [FreeNowSearch, setFreeNowSearch] = useState('');

	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 7.8,
		bearing: 0,
		pitch: 0,
	});

	useEffect(async () => {
		async function Start() {
			var roles = '';

			try {
				const response = await api.get('/auto', {
					headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
				});

				const { name, role } = response.data;
				// console.log(response.data);
				setUsername(name);
				setInitialLetter(name[0]);
				setRole(role);
				roles = role;
			} catch (err) {
				console.log(err);
			}

			await api
				.get('/api/v1/data', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					},
				})
				.then((response) => {
					const { Viagens, Ganhos } = response.data;
					setViagens(Viagens);
					setRendimento(Ganhos);
				})
				.catch((err) => {
					console.log(err);
				});

			if (roles === 'Admin') {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						setViewport({
							latitude: latitude,
							longitude: longitude,
							zoom: 7.8,
							bearing: 0,
							pitch: 0,
						});
					},
					(err) => {
						console.log(err);
					},
					{
						timeout: 30000,
					}
				);
			}

			if (roles === 'Admin') {
				try {
					const response = await api('admin/v1/admin', {
						headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
					});
					await setRotas(response.data);
					console.log(rotas);
					console.log(response.data);
					await setMapLoading(false);
				} catch (err) {
					console.log(err);
				}
				try {
					const response = await api('admin/v1/ubers', {
						headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
					});
					await setUberList(response.data);
					await setUberListBackup(response.data);
				} catch (err) {
					console.log(err);
				}
				try {
					const response = await api('admin/v1/freenow', {
						headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
					});
					await setFreeNowList(response.data);
					await setFreeNowListBackup(response.data);
					await setMapLoading(false);
				} catch (err) {
					console.log(err);
				}
			}
		}

		Start();
	}, []);

	async function Uber(event) {
		event.preventDefault();
		try {
			const response = await api.post('/public/v1/search', {
				json: uberlistbackup,
				query: [uberSearch],
				type: 'Uber',
			});
			setUberList(response.data);
		} catch (err) {
			console.log(err);
		}
	}
	async function FreeNow(event) {
		event.preventDefault();
		try {
			const response = await api.post('/public/v1/search', {
				json: freenowlistbackup,
				query: [FreeNowSearch],
				type: 'FreeNow',
			});
			setFreeNowList(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Header>
				{Role === 'Member' && (
					<>
						<Title>Painel de Usuário</Title>
					</>
				)}
				{Role === 'Admin' && (
					<>
						<MenuContainer>
							<Title>Painel de Administrador</Title>
							<ItemMenu href="/dashboard/bolt">Bolt</ItemMenu>
						</MenuContainer>
					</>
				)}
				<User>
					<Picture>
						<span>{InitialLetter}</span>
					</Picture>
					<Logout
						onClick={() => {
							localStorage.clear();
							history.push('/');
						}}
					>
						Logout
					</Logout>
				</User>
				<Menu>
					<ButtonMenu
						onClick={() => {
							if (!ActiveMenu) {
								setMenu(true);
							} else {
								setMenu(false);
							}
						}}
					>
						<img src={icon} alt="Menu" />
					</ButtonMenu>
				</Menu>
			</Header>
			{Role === 'Admin' && (
				<>
					<Main>
						<Subtitle>Olá, {Username}</Subtitle>

						<CardsGrid>
							<Card>
								<ContainerCard>
									<CardText>Total viagens</CardText>
									<CardTotal>{Viagens}</CardTotal>
								</ContainerCard>
							</Card>
							<Card>
								<ContainerCard>
									<CardText>Total combustiveis</CardText>
									<CardTotal>€ {Combustivel}</CardTotal>
								</ContainerCard>
							</Card>
							<Card>
								<ContainerCard>
									<CardText>Total portagens</CardText>
									<CardTotal>€ {Portagens}</CardTotal>
								</ContainerCard>
							</Card>
							<Card>
								<ContainerCard>
									<CardText>Rendimento</CardText>
									<CardTotal>€ {Rendimento}</CardTotal>
								</ContainerCard>
							</Card>
						</CardsGrid>
						{mapLoading && (
							<>
								<div style={{ display: 'block' }}>
									<Container>
										<Spinner animation="border" />
									</Container>
								</div>
							</>
						)}
						{!mapLoading && (
							<>
								<div className="mapbox-react">
									<ReactMapGL
										{...viewport}
										width="1000px"
										height="500px"
										mapStyle="mapbox://styles/j4g3/ckiytzgx725hg19qqyz73px7a"
										onViewportChange={(nextViewport) => {
											setViewport(nextViewport);
										}}
										mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
										map
									>
										{rotas.map((item) => (
											<>
												<Popup
													key={item.name}
													latitude={parseFloat(item.lat)}
													longitude={parseFloat(item.lon)}
													closeButton={false}
													closeOnClick={false}
													// onClose={() => this.setState({ showPopup: false })}
													anchor="top"
												>
													<div>{item.name}</div>
												</Popup>
											</>
										))}
										{/* <Popup
                      latitude={38.7427455}
                      longitude={-9.1134812}
                      closeButton={false}
                      closeOnClick={false}
                      // onClose={() => this.setState({ showPopup: false })}
                      anchor="top"
                    >
                      <div>???</div>
                    </Popup> */}
										{/* {rotas.map((item) => (
                      <Popup
                        latitude={item.lat}
                        longitude={item.lon}
                        closeButton={false}
                        closeOnClick={false}
                        // onClose={() => this.setState({ showPopup: false })}
                        anchor="top"
                      >
                        <div>{item.name}</div>
                      </Popup>
                    ))} */}
									</ReactMapGL>
								</div>
							</>
						)}
						<ContainerTables>
							<Tables>
								<h4>Uber</h4>
								<FormSearch onSubmit={Uber}>
									<SearchInput
										type="text"
										placeholder="Nome do motorista"
										value={uberSearch}
										onChange={(e) => {
											setUberSearch(e.target.value);
										}}
										required
									/>
									<SearchButton>Buscar</SearchButton>
								</FormSearch>
								{uberlist != null && (
									<>
										<Table>
											<TableHeader>
												<tr>
													<TableTitle>Nome</TableTitle>
													<TableTitle>Despesas</TableTitle>
													<TableTitle>Ganhos De Viagens</TableTitle>
													<TableTitle>Ganhos</TableTitle>
												</tr>
											</TableHeader>
											<TableBody>
												{uberlist.map((item) => (
													<>
														<tr>
															<TableItem>
																<TableItemText>{item.Nome}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>€ {item.Despesas}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>
																	€ {item.GanhosDeViagens}
																</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>€ {item.Ganhos}</TableItemText>
															</TableItem>
														</tr>
													</>
												))}
											</TableBody>
										</Table>
									</>
								)}
							</Tables>
							<Tables>
								<h4>FreeNow</h4>
								<FormSearch onSubmit={FreeNow}>
									<SearchInput
										type="text"
										placeholder="Nome do motorista"
										value={FreeNowSearch}
										onChange={(e) => {
											setFreeNowSearch(e.target.value);
										}}
										required
									/>
									<SearchButton>Buscar</SearchButton>
								</FormSearch>
								{freenowlist != null && (
									<>
										<Table>
											<TableHeader>
												<tr>
													<TableTitle>ID FreeNow</TableTitle>
													<TableTitle>Motorista</TableTitle>
													<TableTitle>Rotas</TableTitle>
													<TableTitle>Horas</TableTitle>
													<TableTitle>Viagem</TableTitle>
													<TableTitle>Preço</TableTitle>
													<TableTitle>Extra</TableTitle>
													<TableTitle>Servico</TableTitle>
													<TableTitle>Metodo</TableTitle>
												</tr>
											</TableHeader>
											<TableBody>
												{freenowlist.map((item) => (
													<>
														<tr>
															<TableItem>
																<TableItemText>{item.id_freenow}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.motorista}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.rotas}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.horas}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.viagem}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>€ {item.preco}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.extra}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.servico}</TableItemText>
															</TableItem>
															<TableItem>
																<TableItemText>{item.metodo}</TableItemText>
															</TableItem>
														</tr>
													</>
												))}
											</TableBody>
										</Table>
									</>
								)}
							</Tables>
						</ContainerTables>
					</Main>
				</>
			)}
			{Role === 'Member' && (
				<>
					{ActiveMenu && (
						<>
							<MenuDashboard
							// style={{
							//   width: '80%',
							//   height: '80%',
							// }}
							>
								<UserMenu>
									<Picture>
										<span>{InitialLetter}</span>
									</Picture>
									<Logout>Logout</Logout>
								</UserMenu>
							</MenuDashboard>
						</>
					)}
					{!ActiveMenu && (
						<>
							<Main>
								<Subtitle>Olá, {Username}</Subtitle>
								<ResultsAndData>
									<TextOfResult>Estes são os seus rendimentos de </TextOfResult>
									<DataRange
										onChange={setData}
										value={data}
										className="calendar"
									></DataRange>
								</ResultsAndData>
								<CardsGrid>
									<Card>
										<ContainerCard>
											<CardText>Total viagens</CardText>
											<CardTotal>{Viagens}</CardTotal>
										</ContainerCard>
									</Card>
									<Card>
										<ContainerCard>
											<CardText>Total combustiveis</CardText>
											<CardTotal>€ {Combustivel}</CardTotal>
										</ContainerCard>
									</Card>
									<Card>
										<ContainerCard>
											<CardText>Total portagens</CardText>
											<CardTotal>€ {Portagens}</CardTotal>
										</ContainerCard>
									</Card>
									<Card>
										<ContainerCard>
											<CardText>Rendimento</CardText>
											<CardTotal>€ {Rendimento}</CardTotal>
										</ContainerCard>
									</Card>
								</CardsGrid>
							</Main>
						</>
					)}
				</>
			)}
		</>
	);
}

export default Dashboard;
