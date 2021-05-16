import styled from 'styled-components';

export const SuggestionsContainer = styled.div`
	display: none;
	width: fit-content;
	background-color: #f9f9f9;
	padding: 0.7%;
	border-radius: 8px;
`;

export const SuggestionsText = styled.a`
	display: block;
	cursor: pointer;
`;

export const Search = styled.input`
	border: 2px solid var(--color-primary);
	padding: 4px;
	border-radius: 6px;
	outline: none;
	margin-bottom: 8px;
	width: 18%;
	max-width: 18%;
`;
