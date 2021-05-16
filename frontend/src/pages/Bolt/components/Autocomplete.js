import React, { useState, useEffect, useRef } from 'react';
import api from '../../../services/api';
import { SuggestionsContainer, SuggestionsText, Search } from './style';

export default function Autocomplete({ textState, setTextState }) {
	const [Words, setWords] = useState([]);
	const SearchInput = useRef(null);

	async function ACScript(text, array) {
		const data = [];
		for (let i = 0; i < array.length; i++) {
			const element = array[i];
			if (element.indexOf(text) > -1 && element.indexOf(text) < 1)
				data.push(element);
		}
		setCompletions(data);
	}

	useEffect(() => {
		async function get_data() {
			try {
				var response = await api.get('/bot/bolt');

				response = await api.get('/bot/bolt/driver/all');
				setWords(response.data);
			} catch (err) {
				console.log(err);
			}
		}

		get_data();
	}, [api]);

	const [completions, setCompletions] = useState([]);

	return (
		<>
			<div>
				<Search
					type="text"
					placeholder="Nome do driver"
					value={textState}
					onFocus={() => {
						SearchInput.current.style.display = 'block';
					}}
					onBlur={() => {
						setTimeout(() => {
							SearchInput.current.style.display = 'none';
						}, 150);
					}}
					onChange={(e) => {
						setTextState(e.target.value);
						ACScript(e.target.value, Words);
					}}
				/>
				<SuggestionsContainer ref={SearchInput}>
					{completions.map((val, index) => (
						<SuggestionsText
							key={index}
							onClick={() => {
								setTextState(val);
							}}
						>
							{val}
						</SuggestionsText>
					))}
				</SuggestionsContainer>
			</div>
		</>
	);
}
