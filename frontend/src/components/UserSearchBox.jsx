import React, { useEffect, useState } from "react"

const UserSearchBox = ({inputValue}) => {
    const [inputName, setInputName] = useState("");

    const handleInputName = (event) => {
        setInputName(event.target.value);
    };

    // const checkUserGuess = (input) => {
    //     if (input != playerData.name) {
    //         // increment strikes: POST request

    //     } else {
    //         // correct checkUserGuess, reveal name and photo, update user points?
    //     }
    // }

    return(
        <form className="user-input">
            <input type="text" placeholder="Enter a player's name here" value={inputValue} onChange={handleInputName}/>
            <button type="button">Enter</button>
        </form>
    )
}

export default UserSearchBox
