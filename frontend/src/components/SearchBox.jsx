import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = ({ handleGuess }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false)

    const handleSearch = async () => {
        try {
            // const response = await axios.post('http://127.0.0.1:8000/api/search-players/', {
            //     search_query: searchQuery,
            // });

            // setSearchResults(response.data.results);
            // setShowDropdown(true)
            handleGuess()
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleSelectResult = (selectedResult) => {
        setSearchQuery(selectedResult.name)
        setShowDropdown(false)
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue);

        if (inputValue.trim() === '') {
            setShowDropdown(false);
        } else {
            handleSearch();
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search for players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {showDropdown && (
                <ul className="search-dropdown">
                    {searchResults.map((player) => (
                        <li key={player.id} onClick={handleInputChange}>
                            {player.name}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleSearch}>Search</button>

            <ul>
                {searchResults.map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBox;
