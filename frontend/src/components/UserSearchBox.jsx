import React, { useEffect, useState } from "react"

const UserSearchBox = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSelectPlayer = (selectedPlayer) => {
        setQuery(selectedPlayer)
        setResults([])
    }

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

        if (query.trim() !== '') {
            fetchResults();
        } else {
            setResults([]);
        }
    }, [query]);

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
        </div>
    );
}

export default UserSearchBox
