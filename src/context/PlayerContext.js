import { createContext } from "react"





const defaultValue = {
    blackPlayerActive: true,
    setBlackPlayerActive:() => {},
    whitePlayerActive: false,
    setWhitePlayerActive: () => {}
}

export const PlayerContext = createContext(defaultValue);