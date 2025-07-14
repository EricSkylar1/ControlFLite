import { useEffect, useState } from 'react';
import "./Popup.css";  
import SearchText from '../components/SearchText';

export default function() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState("");

  useEffect(() => {
  const timeout = setTimeout(() => {
    const searchedItems = searchText(data, searchText);
	setResults(searchedItems);
  }, 300);

  return () => {
    // TODO: cancel timeout if searchText changes
	clearTimeout(timeout);
  };
}, [searchText]);

  return (
    <div>
      	<h1 id="title">Control F Lite</h1> 
		{searchText.trim().length === 0 && (
			<div id="description">
				<span>Find the text you need faster than Ctrl+F, no more clicking up and down arrows to hunt through pages.</span>
				<br /><br />
				<span>Just press <strong>Ctrl + Shift + F</strong> or enter below and find everything in one place.</span>
			</div>                     
	)}
		
		<input 
			type="text" 
			id="search-input"                                                               
			placeholder="Search..." 
			value={searchText}
			onChange={(e) => setSearchText(e.target.value)}
		/>
		{searchText.trim().length > 0 && (
			<SearchText items={results}/>
		)}
    </div>
  )
}
