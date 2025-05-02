// import { useContext } from "react";
import BoxesContainer from "./BoxesContainer";
import { PlayerContext } from "../context/PlayerContext";
import Hirerachy from "./Hirerachy";




const PlayGround = () =>{

    // const {whitePlayerActive,blackPlayerActive} = useContext(PlayerContext);

    return(
        <div className="flex flex-col items-center py-8 justify-center">
            {/* <div className="py-4">
                <h2 className="text-center text-2xl font-semibold">Player State</h2>
                <p className="font-semibold">Player 1: <span className="text-sm font-semibold">color: Black</span> {blackPlayerActive ? "Active" : "Deactive"}</p>
                <p className="font-semibold">Player 2: <span className="text-sm font-semibold">color: White</span> {whitePlayerActive ? "Active" : "Deactive"}</p>
            </div>
            <BoxesContainer/> */}
            <Hirerachy/>
        </div>
    )
}


export default PlayGround;