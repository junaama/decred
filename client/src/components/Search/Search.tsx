import styled from "styled-components";
import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("query", query);
    setQuery("");
  };

  return (
    <Container>
      <IconButton onClick={handleSearch}>{SearchSVG}</IconButton>
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="0x..., naama.eth, naama.lens"
      />
    </Container>
  );
};

const SearchSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={20}
    height={20}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const Container = styled.div`
  border: 1px solid black;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  gap: 4px;
`;
const Input = styled.input`
  outline: none;
  width: 100%;
  border: none;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;
