import { useEffect } from "react";
import playerData from "../data/playerBox.json";




const Hirerachy = () =>{

    // console.log(playerData,"player data");
    const childHire = {
        id:null,
        name:null,
        devices:null,
        children:[]
    }
    
    const hirear = {
        id:null,
        name:null,
        devices:null,
        children:[childHire]
    }

    // console.log(hirear,"hirearchy");

    useEffect(()=>{
        const headPlayer = playerData.filter((item)=> item.path.length == 1);
        const childPlayer = playerData.filter((item) => item.path.length > 1);
        hirear.id = headPlayer[0].id;
        hirear.name = headPlayer[0].name;
        hirear.path = headPlayer[0].path;
        hirear.devices = headPlayer[0].devices;
        function createHirearchy(){

            console.log(childPlayer.pop(15));
            console.log(childPlayer,"player");
        }
        createHirearchy();
    },[]);

    return(
        <>
        </>
    )
}

export default Hirerachy;