import React, { useEffect, useState } from "react"

const UserSearchBox = ({ query, setQuery, handleGuess }) => {

    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const handleSelectPlayer = (selectedPlayer) => {
        setQuery(selectedPlayer)
        setResults([])
    }

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/search-players/?query=${query}`);
                const data = await response.json();
                setResults(data.players);
            } catch (error) {
                console.error('Error fetching player search results:', error);
            }
        };

        if (debouncedQuery.trim() !== '') {
            fetchResults();
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    return (
        <div className="player-search-bar">
            <input
                type="text"
                placeholder="Search players..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <ul className="suggestions-dropdown">
                    {results.map((player, index) => (
                        <li key={index} onClick={() => handleSelectPlayer(player)}>{player}</li>
                    ))}
                </ul>
            )}
            <button type="button" onClick={handleGuess}>
                Go
            </button>
        </div>
    );
}

export default UserSearchBox
