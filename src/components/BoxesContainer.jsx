import { useEffect } from "react";
import { useState } from "react";
import Box from "./Box";
import BoardPiece from "./BoardPiece";




const BoxesContainer = () =>{

    const [checkersBoxes,setCheckersBoxes] = useState([]);

    /**
     * const checkerBox = {
     *  i:i,
     *  j:j
     *  color: 
     * }
     */

    useEffect(()=>{
        function createPlayGround(){
            const playBoxes = [];
            for(let i=0; i<8; i++)
            {
                for(let j=0; j<8; j++)
                {
                    const sum = i+j;
                    const boxObj ={
                        i:null,
                        j:null,
                        color:null,
                        piece:null,
                        active:null
                    }
                    if(sum%2==0){
                        boxObj.i=i;
                        boxObj.j=j;
                        boxObj.color="bg-orange-300";
                    }else{
                        boxObj.i=i;
                        boxObj.j=j;
                        boxObj.color="bg-orange-700";
                        if(i<3){
                            boxObj.piece= 'bg-green-700';
                        }
                        else if(i>4){
                            boxObj.piece = 'bg-black';
                        }
                    }
                    playBoxes.push(boxObj);
                }
            }
            setCheckersBoxes(playBoxes);
        }
        createPlayGround();
    },[]);

    const onHandleClick = (item) =>{
        console.log("item",item);
    }




    return(
        <div className="flex flex-wrap w-[644px] border-2 border-black rounded">
            {
                checkersBoxes.map((item,index)=>(
                    <Box key={index} i={item.i} j={item.j} boxColor={item.color}>
                        <BoardPiece onClick={()=>onHandleClick(item)} i={item.i} j={item.j} color={item.piece}  />
                    </Box>
                ))
            }
        </div>
    )
}


export default BoxesContainer;