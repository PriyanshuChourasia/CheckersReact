import { useState } from "react";
import { PlayerContext } from "./PlayerContext";





const PlayerProvider = ({children}) =>{
    const [blackPlayerActive,setBlackPlayerActive] =  useState(true);
    const [whitePlayerActive,setWhitePlayerActive] = useState(false);
    return(
        <PlayerContext.Provider value={{
            blackPlayerActive,setBlackPlayerActive,
            whitePlayerActive,setWhitePlayerActive
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider;