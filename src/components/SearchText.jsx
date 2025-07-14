import "./SearchText.css";
import { useState, useEffect } from 'react';
import { searchForText, scrollToElement } from "../popup.js";

export default function SearchText({ searchText }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("searchText changed:", searchText);

    if (!searchText.trim()) {
      setResults([]);
      setMessage('');
      return;
    }

    setLoading(true);
    setMessage('');
    setResults([]); // Clear any old results immediately

    const timeout = setTimeout(async () => {
      	try {
        	const found = await searchForText(searchText);

        	if (!found || found.length === 0) {
          		setResults([]);
          		setMessage("No text matching your search found.");
        	} else {
          		setResults(found);
          		setMessage('');
        	}
      	} catch (e) {
        	console.error("Error during search:", e);
        	setResults([]);
        	setMessage("An error occurred. Try again.");
      	} finally {
        	setLoading(false);
      	}
    }, 1000); // debounce time

    return () => clearTimeout(timeout);
  }, [searchText]);

  return (
    <div id="text-list">
		{loading ? (
			<div>Searching...</div>
		) : results.length > 0 ? (
			<div id="text-list">
				<div>
					Results Found: {results.length}
				</div>
				{results.map((item, i) => (
				<button id="text-item" onClick={() => scrollToElement(item.id)} key={i}>{highlightMatches(item, searchText)}</button>
			))}
			</div>
		) : message ? (
			<div>{message}</div>
		) : null}
	</div>

  );
}

function highlightMatches(item, query) {
  if (!query) return item;
  const parts = item.text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: "yellow" }}>{part}</mark>
    ) : (
      part
    )
  );
}