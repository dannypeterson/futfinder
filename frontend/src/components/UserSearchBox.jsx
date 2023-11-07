import React, { useEffect, useState } from "react"
const UserSearchBox = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

    };
    return(
        <div className="user-input">
            <input type="text" placeholder="Enter a player name here" value={inputValue} onChange={handleInputChange}/>
            <button type="button">Go</button>
        </div>
    )
}

export default UserSearchBox
