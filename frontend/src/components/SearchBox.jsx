import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/search-players/', {
                search_query: searchQuery,
            });

            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
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
