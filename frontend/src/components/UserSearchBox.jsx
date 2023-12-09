import React, { useEffect, useState } from "react"
import { searchPlayers } from "../api";

const UserSearchBox = ({ searchQuery, setSearchQuery, handleGuess, setUserGuess, duplicatePlayer }) => {

    const [results, setResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // clicking on a search bar autofill
    const handleSelectPlayer = (selectedPlayer) => {
        setSearchQuery(selectedPlayer.name)
        setUserGuess(selectedPlayer) // TODO move to Game ?
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
                if (debouncedQuery.trim() !== '') {
                    const fetchedResults = await searchPlayers(debouncedQuery);
                    setResults(fetchedResults);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error('Error fetching player search results:', error);
            }
        };
        fetchResults();
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
