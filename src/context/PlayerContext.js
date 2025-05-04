import { createContext } from "react"





const defaultValue = {
    blackPlayerActive: true,
    setBlackPlayerActive:() => {},
    whitePlayerActive: false,
    setWhitePlayerActive: () => {},
    enemyFound:false,
    setEnemyFound: () => {}
}

export const PlayerContext = createContext(defaultValue);