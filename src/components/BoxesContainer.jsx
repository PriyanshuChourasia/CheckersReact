import { useEffect } from "react";
import { useState } from "react";
import Box from "./Box";
import BoardPiece from "./BoardPiece";
import { PlayerContext } from "../context/PlayerContext";




const BoxesContainer = () =>{

    const [checkersBoxes,setCheckersBoxes] = useState([]);
    // const {setBlackPlayerActive,setWhitePlayerActive} = useContext(PlayerContext);


    // let enemyPieceboxes = [];

    /**
     * const checkerBox = {
     *  i:i,
     *  j:j
     *  color: 
     * }
     */

    /***
     * ld = left downward
     * rd = right downward
     * lu = left upward
     * ru = right upward
     * 
     * position: attacker position it means the position of attacker
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
                        playerActive:null,
                        playerMoveActive:null,
                        position:null,
                        direction: null,
                        playerKing: null,
                        kingBox:null
        };

                   i:position,
                        j:position,
                        color:box colors on board,
                        piece:if there is a piece on that box then only if will have a value,
                        active: this means the box which have been clicked it have a player or not it contains piece or not,
                        playerId: this is for identity,
                        stepActive: if the box which have been clicked that box is a step for that player or not and if this is true then it means player want to move to that position,
                        playerActive: if this is true means it defines whether this player wants to move or not if player is going to make a move or this piece has been clicked by the playing person ,
                        playerMoveActive: this is for the chances,
                        position: it is the position of the attacker


        if piece makes a move then the previous place should make color
        color: should be player active color
        piece: null
        active: null
        playerId: null
        stepActive: null,
        playerActive: null,
        playerMoveActive:null,
        kingArea:null,
        playerKing:nulll

        the move player to the moved box
        color: should be player active color
        piece: prev piece
        active: true
        playerId: player is should be previous player id
        stepActive: null,
        playerActive: prev player active,
        playerMoveActive:null,
        kingArea: if this is true then the player will be king,
        playerKing: if the player has become king then only it will be true

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
                        playerMoveActive:null,
                        position:null,
                        direction:null,
                        playerKing:null,
                        kingArea:null
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

                    if(i == 0){
                        boxObj.kingArea = "black";
                    }else if(i == 7){
                        boxObj.kingArea = "green";
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
                console.log(item,"king item");
                movePiece(checkersBoxes,item);
                return;
            }else if(item.stepActive == false){
                console.log("wrong condition")
            }
            return;
        }

        console.log(checkersBoxes,"checkers boxes");

        if(item.playerMoveActive == true && item.playerId == "black" && item.playerKing == null)
        {
            playerOneMovement(item);
        }
    }

    function playerOneMovement(item){
        const playerI = item.i;
        const playerJ = item.j;
      
        const updateColorBox = checkersBoxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const whiteBoxDeactive = updateColorBox.map((item) => item.color.includes('bg-red-500') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const playerActiveFilter = whiteBoxDeactive.filter((item)=> item.playerActive == true);
        let playerOneBoxes = whiteBoxDeactive;


        if(playerActiveFilter.length > 0){
            const pI = playerActiveFilter[0].i;
            const pJ = playerActiveFilter[0].j;
            playerOneBoxes = whiteBoxDeactive.map((item) => Number(item.i) == pI && Number(item.j) == pJ ? {...item,playerActive:null}:item);
        }


        const newUpdatePlayerActive = playerOneBoxes.map((item)=> Number(item.i) == playerI && Number(item.j) == playerJ ? {...item,playerActive:true}: item);
        


        let righti = item.i;
        let rightj = item.j;
        let lefti = item.i;
        let leftj = item.j;
        
        // if go upwards
        righti = righti - 1;
        rightj = rightj + 1;

        lefti = lefti - 1;
        leftj = leftj - 1;
 
        const rightUpwardCheck = newUpdatePlayerActive.some(x => righti >= 0 && rightj < 8 && Number(x.i) == righti && Number(x.j) == rightj && x.piece == null);
        const leftUpwardCheck = newUpdatePlayerActive.some(x => lefti >=0 && leftj >=0 && Number(x.i) == lefti && Number(x.j) == leftj && x.piece == null);
        console.log(rightUpwardCheck,leftUpwardCheck,"check");

        if(rightUpwardCheck && leftUpwardCheck){
            const newCheckersBox = newUpdatePlayerActive.map((item) => Number(item.i) == righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            const updatedCheckersBox = newCheckersBox.map((item) => Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            setCheckersBoxes(updatedCheckersBox);
            return;
        }
        else if(rightUpwardCheck){
            const newCheckersBox = newUpdatePlayerActive.map((item) => Number(item.i) == righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            setCheckersBoxes(newCheckersBox);
        }else if(leftUpwardCheck){
            const updatedCheckersBox = newUpdatePlayerActive.map((item) => Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            setCheckersBoxes(updatedCheckersBox);
            return;
        }
        
    }

    // function playerNoDeactive(players){

    //     const blackActive = players.filter((item) => item.playerMoveActive == true && item.playerId == "black");
    //     const whiteActive = players.filter((item) => item.playerMoveActive == true && item.playerId == "green");

    //     if(blackActive.length > 0){
    //         const deactiveBlackMovePlayer = players.map((item)=> item.playerMoveActive == true && item.playerId == "black" ? {...item,playerMoveActive:null,active:true}:item);
    //         const activeWhiteMovePlayer = deactiveBlackMovePlayer.map((item)=> item.playerMoveActive == null && item.playerId == "green" ? {...item,playerMoveActive:true,active:true}:item);
    //         setCheckersBoxes(activeWhiteMovePlayer);
    //         setWhitePlayerActive(true);
    //         setBlackPlayerActive(false);
    //     }
    //     else if(whiteActive.length > 0){
    //         const deactiveWhiteMovePlayer = players.map((item)=> item.playerMoveActive == true && item.playerId == "green" ? {...item,playerMoveActive:null,active:true}:item);
    //         const activeBlackMovePlayer = deactiveWhiteMovePlayer.map((item)=> item.playerMoveActive == null && item.playerId == "black" ? {...item,playerMoveActive:true,active:true}:item);
    //         setCheckersBoxes(activeBlackMovePlayer);
    //         setWhitePlayerActive(false);
    //         setBlackPlayerActive(true);
    //     }
    // }


    function movePiece(boxes,item){
        const nextI = item.i;
        const nextJ = item.j;
        
        
        const playeractive = boxes.filter((x) => x.playerActive == true);
  
        const playerActiveI = playeractive[0].i;
        const playerActiveJ = playeractive[0].j;
        const playerActiveColor = playeractive[0].color;
        const prevBoxMove = boxes.map((item) => Number(item.i) == playerActiveI && Number(item.j) == playerActiveJ ? {...item,color:playerActiveColor,piece:null,playerActive:null,stepActive:null,active:null,playerId:null,playerKing:null}: item);
        setCheckersBoxes(prevBoxMove);

        const playerPiece = playeractive[0].piece;
        const nextActive = playeractive[0].active;
        const nextPlayerId = playeractive[0].playerId;

        console.log(item,"item move piece");

        console.log(playeractive,"player active");
        
        if(item.kingArea == null){
            if(playeractive[0].playerKing == true){
                const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null,playerKing:playeractive[0].playerKing,playerMoveActive:true} : item);
                setCheckersBoxes(nextBoxMove);
                resetBoard(nextBoxMove);
            }else{
                const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null,playerMoveActive:true} : item);
                setCheckersBoxes(nextBoxMove);
                resetBoard(nextBoxMove);
            }
        }
        else if(item.kingArea != null){
            const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null,playerKing:true,playerMoveActive:true} : item);
            setCheckersBoxes(nextBoxMove);
            resetBoard(nextBoxMove);
        }  
    }


    function resetBoard(boxes){
        const updateColorBox = boxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",stepActive:null,playerActive:null} : item);
        const newupdateColorBox = updateColorBox.map((item) => item.color.includes('bg-red-500') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const playerIdResetBoxes = newupdateColorBox.map((item)=> item.piece == null ? {...item,playerId:null}:item);
        setCheckersBoxes(playerIdResetBoxes);
        // playerNoDeactive(playerIdResetBoxes);
    }

    function computerMove(item){
        console.log(item,"item");
    }



    return(
        <div className="flex flex-wrap w-[644px] border-2 border-black rounded">
            {
                checkersBoxes.map((item,index)=>(
                    <Box onClick={()=>onHandleClick(item)} key={index} i={item.i} j={item.j} boxColor={item.color}>
                        <BoardPiece  i={item.i} j={item.j} color={item.piece} king={item.playerKing}  />
                    </Box>
                ))
            }
        </div>
    )
}


export default BoxesContainer;