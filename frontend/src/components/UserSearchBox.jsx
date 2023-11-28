import React, { useEffect, useState } from "react"

const UserSearchBox = ({ searchQuery, setSearchQuery, handleGuess, setUserGuess, duplicatePlayer }) => {

    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // clicking on a search bar autofill
    const handleSelectPlayer = (selectedPlayer) => {
        setSearchQuery(selectedPlayer.name)
        setUserGuess(selectedPlayer) // TODO move to Game ?
        setResults([]) // TODO clear search results after user selects player
    }

    // debouncing query
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 400);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    // search results
    useEffect(() => {
        const fetchResults = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/search-players/?query=${searchQuery}`);
                const response = await fetch(`https://futfinder-d2b9385f217b.herokuapp.com/search-players/?query=${searchQuery}`);
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
        <>
            {duplicatePlayer && <p style={{ 'color': 'red', 'textAlign': 'center' }}>You have already guessed this player.</p>}
            <div className="player-search-bar">
                <input
                    type="text"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {results.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {results.map((player, index) => (
                            <li key={index} onClick={() => handleSelectPlayer(player)}>{player.name}</li>
                        ))}
                    </ul>
                )}
                <button type="button" onClick={handleGuess}>
                    Go
                </button>
            </div>
        </>
    );
}

export default UserSearchBox
