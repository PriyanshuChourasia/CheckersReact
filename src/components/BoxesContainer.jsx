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
                            boxObj.active=true;
                        }
                        else if(i>4){
                            boxObj.piece = 'bg-black';
                            boxObj.active=true;
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
        if(item.active !== true){
            return;
        }

        

        const updateColorBox = checkersBoxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",active:false} : item);

        let righti = item.i;
        let rightj = item.j;
        let lefti = item.i;
        let leftj = item.j;
        
        // if go upwards
        righti = righti - 1;
        rightj = rightj + 1;

        lefti = lefti - 1;
        leftj = leftj - 1;
        console.log("i",righti);
        console.log(checkersBoxes,"boxes");
        const rightUpward = updateColorBox.filter(x => righti >= 0 && rightj < 8 ? Number(x.i) == righti && Number(x.j) == rightj : null);
        const leftUpward = updateColorBox.filter(x => lefti >=0 && leftj >=0 ? Number(x.i) == lefti && Number(x.j) == leftj : null);
        if(rightUpward.length > 0 && leftUpward.length >0 && rightUpward[0].piece == null && leftUpward[0].piece == null){
            console.log(righti,rightj,"i,j");
            console.log(lefti,leftj,"i,j");
            const newCheckersBox = updateColorBox.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:false}:item);
            const leftUpwardBoxes = newCheckersBox.map((item) => Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:false}:item);
            setCheckersBoxes(leftUpwardBoxes);
        }
        else if(rightUpward.length > 0 && rightUpward[0].piece == null){
            const newCheckersBox = updateColorBox.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:false}:item);
            setCheckersBoxes(newCheckersBox);
        }
        else if(leftUpward.length > 0 && leftUpward[0].piece == null){
            const leftUpwardBoxes = updateColorBox.map((item)=> Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:false}: item);
            setCheckersBoxes(leftUpwardBoxes);
        }
    }




    return(
        <div className="flex flex-wrap w-[644px] border-2 border-black rounded">
            {
                checkersBoxes.map((item,index)=>(
                    <Box onClick={()=>onHandleClick(item)} key={index} i={item.i} j={item.j} boxColor={item.color}>
                        <BoardPiece  i={item.i} j={item.j} color={item.piece}  />
                    </Box>
                ))
            }
        </div>
    )
}


export default BoxesContainer;