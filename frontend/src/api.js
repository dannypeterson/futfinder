
const baseURL = import.meta.env.VITE_BASE_URL

// make request to backend for search results
export const searchPlayers = async (query) => {
    try {
        const response = await fetch(`${baseURL}/search-players/?query=${query}`);
        const data = await response.json();
        return data.players;
    } catch (error) {
        console.error('Error fetching player search results:', error);
        return [];
    }
};
