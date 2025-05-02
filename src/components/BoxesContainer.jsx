import { useContext, useEffect } from "react";
import { useState } from "react";
import Box from "./Box";
import BoardPiece from "./BoardPiece";
import { PlayerContext } from "../context/PlayerContext";




const BoxesContainer = () =>{

    const [checkersBoxes,setCheckersBoxes] = useState([]);
    const {setBlackPlayerActive,setWhitePlayerActive} = useContext(PlayerContext);

    /**
     * const checkerBox = {
     *  i:i,
     *  j:j
     *  color: 
     * }
     */


    /***
     *  const boxObj ={
                        i:null,
                        j:null,
                        color:null,
                        piece:null,
                        active:null,
                        playerId:null,
                        stepActive:null,
                        playerActive:null
        };
        if piece makes a move then the previous place should make color
        color: should be player active color
        piece: null
        active: null
        playerId: null
        stepActive: null,
        playerActive: null,
        playerMoveActive:null,

        the move player to the moved box
        color: should be player active color
        piece: prev piece
        active: true
        playerId: player is should be previous player id
        stepActive: null,
        playerActive: prev player active,
        playerMoveActive:null,

        after every move you have active and deactive player
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
                        active:null,
                        playerId:null,
                        stepActive:null,
                        playerActive:null,
                        playerMoveActive:null
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
                            boxObj.playerId = "green";
                            boxObj.playerMoveActive = null;
                        }
                        else if(i>4){
                            boxObj.piece = 'bg-black';
                            boxObj.active=true;
                            boxObj.playerId = "black";
                            boxObj.playerMoveActive = true
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
            if(item.stepActive == true){
                movePiece(checkersBoxes,item);
                return;
            }
            return;
        }
        // playerTwoMovement(item);
        if(item.playerMoveActive == true && item.playerId == "black")
        {
            playerOneMovement(item);
        }
        else if(item.playerMoveActive == true && item.playerId == "green"){
            playerTwoMovement(item);
        }else{
            console.log("else move");
        }
   

    }

    function playerOneMovement(item){
        const playerI = item.i;
        const playerJ = item.j;
        

        const updateColorBox = checkersBoxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",active:false,stepActive:false,playerActive:false} : item);
        const newUpdatePlayerActive = updateColorBox.map((item)=> Number(item.i) == playerI && Number(item.j) == playerJ ? {...item,playerActive:true}: item);


        let righti = item.i;
        let rightj = item.j;
        let lefti = item.i;
        let leftj = item.j;
        
        // if go upwards
        righti = righti - 1;
        rightj = rightj + 1;

        lefti = lefti - 1;
        leftj = leftj - 1;
 
        const rightUpward = newUpdatePlayerActive.filter(x => righti >= 0 && rightj < 8 ? Number(x.i) == righti && Number(x.j) == rightj : null);
        const leftUpward = newUpdatePlayerActive.filter(x => lefti >=0 && leftj >=0 ? Number(x.i) == lefti && Number(x.j) == leftj : null);
        if(rightUpward.length > 0 && leftUpward.length >0 && rightUpward[0].piece == null && leftUpward[0].piece == null){
            const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}:item);
            const leftUpwardBoxes = newCheckersBox.map((item) => Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}:item);
            setCheckersBoxes(leftUpwardBoxes);
        }
        else if(rightUpward.length > 0 && rightUpward[0].piece == null){
            const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}:item);
            setCheckersBoxes(newCheckersBox);
        }
        else if(leftUpward.length > 0 && leftUpward[0].piece == null){
            const leftUpwardBoxes = newUpdatePlayerActive.map((item)=> Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}: item);
            setCheckersBoxes(leftUpwardBoxes);
        }
    }

    function playerTwoMovement(item){

        const playerI = item.i;
        const playerJ = item.j;
        const updateColorBox = checkersBoxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const playerActiveFilter = updateColorBox.filter((item)=> item.playerActive == true);

        let deactivePlayers = updateColorBox;
        if(playerActiveFilter.length > 0){
            const pI = playerActiveFilter[0].i;
            const pJ = playerActiveFilter[0].j;
            deactivePlayers = updateColorBox.map((item) => Number(item.i) == pI && Number(pJ) ? {...item,playerActive:null}:item);
        }

        const newUpdatePlayerActive = deactivePlayers.map((item)=> Number(item.i) == playerI && Number(item.j) == playerJ ? {...item,playerActive:true}: item);


   

        let rightI = item.i;
        let rightJ = item.j;
        let leftI = item.i;
        let leftJ = item.j;

        // if do downwards
        // right move
        rightI = rightI + 1;
        rightJ = rightJ + 1;
        //  left move
        leftI = leftI + 1;
        leftJ = leftJ - 1;


        const rightDownward = newUpdatePlayerActive.filter((item)=> rightI < 8 && rightJ < 8 ? Number(item.i) == rightI && Number(item.j) == rightJ : null );
        const leftDownward = newUpdatePlayerActive.filter((item) => leftI < 8 && leftJ >= 0 ? Number(item.i) == leftI && Number(item.j) == leftJ : null);
   
        if(rightDownward.length > 0 && leftDownward.length > 0 && rightDownward[0].piece == null && leftDownward[0].piece == null){
            const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  rightI && Number(item.j) == rightJ ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}:item);
            const leftBoxes = newCheckersBox.map((item) => Number(item.i) == leftI && Number(item.j) == leftJ ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}:item);
            setCheckersBoxes(leftBoxes);
        }
        else if(rightDownward.length > 0 && rightDownward[0].piece == null){
            const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  rightI && Number(item.j) == rightJ ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}:item);
            setCheckersBoxes(newCheckersBox);
        }
        else if(leftDownward.length > 0 && leftDownward[0].piece == null){
            const leftDownwardBoxes = newUpdatePlayerActive.map((item)=> Number(item.i) == leftI && Number(item.j) == leftJ ? {...item,color:"bg-fuchsia-500",active:false,stepActive:true}: item);
            setCheckersBoxes(leftDownwardBoxes);
        }
    }

    function playerNoDeactive(players){

        const blackActive = players.filter((item) => item.playerMoveActive == true && item.playerId == "black");
        const whiteActive = players.filter((item) => item.playerMoveActive == true && item.playerId == "green");
        
        console.log(blackActive,"black");
        console.log(whiteActive,"white");

        if(blackActive.length > 0){
            const deactiveBlackMovePlayer = players.map((item)=> item.playerMoveActive == true && item.playerId == "black" ? {...item,playerMoveActive:null}:item);
            console.log(deactiveBlackMovePlayer,"deactive black");
            const activeWhiteMovePlayer = deactiveBlackMovePlayer.map((item)=> item.playerMoveActive == null && item.playerId == "green" ? {...item,playerMoveActive:true}:item);
            console.log(activeWhiteMovePlayer,"active white");
            setCheckersBoxes(activeWhiteMovePlayer);
            setWhitePlayerActive(true);
            setBlackPlayerActive(false);
        }
        else if(whiteActive.length > 0){
            const deactiveWhiteMovePlayer = players.map((item)=> item.playerMoveActive == true && item.playerId == "green" ? {...item,playerMoveActive:null}:item);
            console.log(deactiveWhiteMovePlayer,"deactive white");
            const activeBlackMovePlayer = deactiveWhiteMovePlayer.map((item)=> item.playerMoveActive == null && item.playerId == "black" ? {...item,playerMoveActive:true}:item);
            console.log(activeBlackMovePlayer,"active black");
            setCheckersBoxes(activeBlackMovePlayer);
            setWhitePlayerActive(false);
            setBlackPlayerActive(true);
        }
    }


    function movePiece(boxes,item){

        const nextI = item.i;
        const nextJ = item.j;
     
       
  
        const playeractive = boxes.filter((x) => x.playerActive == true);
  
        const playerActiveI = playeractive[0].i;
        const playerActiveJ = playeractive[0].j;
        const playerActiveColor = playeractive[0].color;
        const prevBoxMove = boxes.map((item) => Number(item.i) == playerActiveI && Number(item.j) == playerActiveJ ? {...item,color:playerActiveColor,piece:null,playerActive:null,stepActive:null,active:null,playerId:null}: item);
        setCheckersBoxes(prevBoxMove);

        const playerPiece = playeractive[0].piece;
        const nextActive = playeractive[0].active;
        const nextPlayerId = playeractive[0].playerId;
        // const nextPlayerActive = playeractive[0].playerActive;
        const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null} : item);
        setCheckersBoxes(nextBoxMove);
        resetBoard(nextBoxMove);
  
    }


    function resetBoard(boxes){
        const updateColorBox = boxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",stepActive:null,playerActive:null} : item);
        setCheckersBoxes(updateColorBox);
        playerNoDeactive(updateColorBox);
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