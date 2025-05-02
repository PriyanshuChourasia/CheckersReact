import { useEffect } from "react";
import playerData from "../data/playerBox.json";




const Hirerachy = () =>{

    console.log(playerData,"player data");
    const childHire = {
        id:null,
        name:null,
        devices:null,
    }
    
    const hirear = {
        id:null,
        name:null,
        devices:null,
        children:[childHire]
    }

    console.log(hirear,"hirearchy");

    useEffect(()=>{
        function createHirearchy(){

        }
        createHirearchy();
    },[]);

    return(
        <>
        </>
    )
}

export default Hirerachy;