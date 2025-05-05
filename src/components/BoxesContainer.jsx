import { useContext, useEffect } from "react";
import { useState } from "react";
import Box from "./Box";
import BoardPiece from "./BoardPiece";
import { PlayerContext } from "../context/PlayerContext";




const BoxesContainer = () =>{

    const [checkersBoxes,setCheckersBoxes] = useState([]);
    const {setBlackPlayerActive,setWhitePlayerActive} = useContext(PlayerContext);


    let enemyPieceboxes = [];

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
            }else if(item.stepActive == null && item.color == "bg-white"){
                launchAttack(item);
            }else if(item.stepActive == false){
                console.log("wrong condition")
            }
            return;
        }


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
      
        const updateColorBox = checkersBoxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const whiteBoxDeactive = updateColorBox.map((item) => item.color.includes('bg-white') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const playerActiveFilter = whiteBoxDeactive.filter((item)=> item.playerActive == true);
        let playerOneBoxes = whiteBoxDeactive;
        // setCheckersBoxes(whiteBoxDeactive);

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
 
        const rightUpward = newUpdatePlayerActive.filter(x => righti >= 0 && rightj < 8 ? Number(x.i) == righti && Number(x.j) == rightj : null);
        const leftUpward = newUpdatePlayerActive.filter(x => lefti >=0 && leftj >=0 ? Number(x.i) == lefti && Number(x.j) == leftj : null);
        if(rightUpward.length > 0 && leftUpward.length >0 && rightUpward[0].piece == null && leftUpward[0].piece == null){
            const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            const leftUpwardBoxes = newCheckersBox.map((item) => Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            setCheckersBoxes(leftUpwardBoxes);
        }
        else if(rightUpward.length > 0 && rightUpward[0].piece == null){
            if(leftUpward[0]?.piece != null && leftUpward[0]?.playerId != "black"){
                const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
                setCheckersBoxes(newCheckersBox);
                if(newCheckersBox){
                    checkForEnemy(item,newCheckersBox);
                }
            }else{
                const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  righti && Number(item.j) == rightj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
                setCheckersBoxes(newCheckersBox);
            }

        }
        else if(leftUpward.length > 0 && leftUpward[0].piece == null){
            if(rightUpward[0]?.piece != null && rightUpward[0]?.playerId != "black"){
                const leftUpwardBoxes = newUpdatePlayerActive.map((item)=> Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}: item);
                setCheckersBoxes(leftUpwardBoxes);
                if(leftUpwardBoxes){
                    checkForEnemy(item,leftUpwardBoxes);
                }
            }else{
                const leftUpwardBoxes = newUpdatePlayerActive.map((item)=> Number(item.i) == lefti && Number(item.j) == leftj ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}: item);
                setCheckersBoxes(leftUpwardBoxes);
            }
        }
        else if(leftUpward.length > 0 && leftUpward[0].piece != null){
            setCheckersBoxes(newUpdatePlayerActive);
            checkForEnemy(item,newUpdatePlayerActive);
        }
        else if(rightUpward.length > 0  && rightUpward[0].piece != null){
            console.log("entry mode enemy both side");
            setCheckersBoxes(newUpdatePlayerActive);
            checkForEnemy(item,newUpdatePlayerActive);
        }
        
    }

    function playerTwoMovement(item){

        const playerI = item.i;
        const playerJ = item.j;
        const updateColorBox = checkersBoxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const deactiveWhiteBoxes = updateColorBox.map((item) => item.color.includes('bg-white') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        const playerActiveFilter = deactiveWhiteBoxes.filter((item)=> item.playerActive == true);

        let deactivePlayers = deactiveWhiteBoxes;
        if(playerActiveFilter.length > 0){
            const pI = playerActiveFilter[0].i;
            const pJ = playerActiveFilter[0].j;
            deactivePlayers = deactiveWhiteBoxes.map((item) => Number(item.i) == pI && Number(item.j) == pJ ? {...item,playerActive:null}:item);
        }

        const newUpdatePlayerActive = deactivePlayers.map((item)=> Number(item.i) == playerI && Number(item.j) == playerJ ? {...item,playerActive:true}: item);


        console.log("movement",item);

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
            const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  rightI && Number(item.j) == rightJ ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            const leftBoxes = newCheckersBox.map((item) => Number(item.i) == leftI && Number(item.j) == leftJ ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
            setCheckersBoxes(leftBoxes);
        }
        else if(rightDownward.length > 0 && rightDownward[0].piece == null){
            if(leftDownward[0]?.piece != null && leftDownward[0]?.playerId != "green"){
                const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  rightI && Number(item.j) == rightJ ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
                setCheckersBoxes(newCheckersBox);
                if(newCheckersBox){
                    checkForEnemy(item,newCheckersBox);
                }
            }else{
                const newCheckersBox = newUpdatePlayerActive.map((item)=> Number(item.i) ==  rightI && Number(item.j) == rightJ ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}:item);
                setCheckersBoxes(newCheckersBox);
            }

        }
        else if(leftDownward.length > 0 && leftDownward[0].piece == null){
            if(rightDownward[0]?.piece != null && rightDownward[0]?.playerId != "green"){
                const leftDownwardBoxes = newUpdatePlayerActive.map((item)=> Number(item.i) == leftI && Number(item.j) == leftJ ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}: item);
                setCheckersBoxes(leftDownwardBoxes);
                if(leftDownwardBoxes){
                    checkForEnemy(item,leftDownwardBoxes);
                }
            }else{
                const leftDownwardBoxes = newUpdatePlayerActive.map((item)=> Number(item.i) == leftI && Number(item.j) == leftJ ? {...item,color:"bg-fuchsia-500",active:null,stepActive:true}: item);
                setCheckersBoxes(leftDownwardBoxes);
            }
        }else if(leftDownward.length > 0 && leftDownward[0].piece != null){
            setCheckersBoxes(newUpdatePlayerActive);
            checkForEnemy(item,newUpdatePlayerActive);
        }
        else if(rightDownward.length > 0 && rightDownward[0].piece != null){
            setCheckersBoxes(newUpdatePlayerActive);
            checkForEnemy(item,newUpdatePlayerActive);
        }
    }

    function playerNoDeactive(players){

        const blackActive = players.filter((item) => item.playerMoveActive == true && item.playerId == "black");
        const whiteActive = players.filter((item) => item.playerMoveActive == true && item.playerId == "green");

        if(blackActive.length > 0){
            const deactiveBlackMovePlayer = players.map((item)=> item.playerMoveActive == true && item.playerId == "black" ? {...item,playerMoveActive:null,active:true}:item);
            const activeWhiteMovePlayer = deactiveBlackMovePlayer.map((item)=> item.playerMoveActive == null && item.playerId == "green" ? {...item,playerMoveActive:true,active:true}:item);
            setCheckersBoxes(activeWhiteMovePlayer);
            setWhitePlayerActive(true);
            setBlackPlayerActive(false);
        }
        else if(whiteActive.length > 0){
            const deactiveWhiteMovePlayer = players.map((item)=> item.playerMoveActive == true && item.playerId == "green" ? {...item,playerMoveActive:null,active:true}:item);
            const activeBlackMovePlayer = deactiveWhiteMovePlayer.map((item)=> item.playerMoveActive == null && item.playerId == "black" ? {...item,playerMoveActive:true,active:true}:item);
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
        
        if(item.kingArea == null){
            console.log("move new")
            const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null} : item);
            setCheckersBoxes(nextBoxMove);
            resetBoard(nextBoxMove);
        }
        else if(item.kingArea == "black"){
            const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null,playerKing:true} : item);
            setCheckersBoxes(nextBoxMove);
            resetBoard(nextBoxMove);
        }
        else if(item.kingArea == "green"){
            const nextBoxMove = prevBoxMove.map((item) => Number(item.i) == nextI && Number(item.j) == nextJ ? {...item,color:playerActiveColor,piece:playerPiece,active:nextActive,playerId:nextPlayerId,playerActive:null,stepActive:null,playerKing:true} : item);
            setCheckersBoxes(nextBoxMove);
            resetBoard(nextBoxMove);
        }

     
        
  
    }


    function resetBoard(boxes){
        const updateColorBox = boxes.map((item) => item.color.includes('bg-fuchsia-500') ? {...item,color:"bg-orange-700",stepActive:null,playerActive:null} : item);
        const newupdateColorBox = updateColorBox.map((item) => item.color.includes('bg-white') ? {...item,color:"bg-orange-700",active:null,stepActive:null,playerActive:null} : item);
        setCheckersBoxes(newupdateColorBox);
        playerNoDeactive(newupdateColorBox);
    }


    function checkForEnemy(item,boxes){

        console.log(item,"check enemy");
        if(item.playerId == "black"){
            checkForRightUpward(item,item.i,item.j,boxes);
            return;
        }else if(item.playerId == "green"){
            checkForRightDownward(item,item.i,item.j,boxes);
            return;
        }

    }

    function checkForRightUpward(item,i,j,boxes){
        let rightI = i;
        let rightJ = j;
        rightI = rightI - 1;
        rightJ = rightJ + 1;

        const enemyPlayer = boxes.filter((item) => rightI >=0 && rightJ < 8 && Number(item.i) == rightI && Number(item.j) == rightJ && item.piece != null);

        if(enemyPlayer.length > 0 && enemyPlayer[0].playerId != "black"){
            checkForRightUpward(item,rightI,rightJ,boxes);
            return;
        }else if(enemyPlayer.length == 0){
            if(rightI < 0 && rightJ > 7){
                checkForLeftUpward(item,item.i,item.j,boxes);
                return;
            }
            else if(i == item.i && j == item.j)
            {
                console.log("go for left check");
                checkForLeftUpward(item,item.i,item.j,boxes);
                return;
            }
            else{
                const attackForLeft = attackActiveEnemy(item,rightI,rightJ,boxes,"ru");
                checkForLeftUpward(item,item.i,item.j,attackForLeft);
                return;
            }
        }else{
            return;
        }
    }

    function checkForLeftUpward(item,i,j,boxes){
        let leftI = i;
        let leftJ = j;

        leftI = leftI - 1;
        leftJ = leftJ - 1;
        
        const enemyLeftPlayer = boxes.filter((item) => leftI >=0 && leftJ >=0 && Number(item.i) == leftI && Number(item.j) == leftJ && item.piece != null);

        console.log(enemyLeftPlayer);

        if(enemyLeftPlayer.length > 0 && enemyLeftPlayer[0].playerId != "black"){
            checkForLeftUpward(item,leftI,leftJ,boxes);
            return;
        }
        else if(enemyLeftPlayer.length == 0){

            if(leftI < 0 && leftJ < 0){
                return;
            }
            else if(i == item.i && j == item.j){
                return;
            }
            else if(leftI >= 0 && leftJ >= 0){
                attackActiveEnemy(item,leftI,leftJ,boxes,"lu");
                return;
            }
        }else{
            return;
        }
       
    }

    function checkForRightDownward(item,i,j,boxes){
        let rightI = i;
        let rightJ = j;

        rightI = rightI + 1;
        rightJ = rightJ + 1;

        const enemyDownRight = boxes.filter((item) => rightI <= 7 && rightJ <= 7 && Number(item.i) == rightI && Number(item.j) == rightJ && item.piece != null);
        if(enemyDownRight.length > 0 && enemyDownRight[0].playerId != "green"){
            checkForRightDownward(item,rightI,rightJ,boxes);
            return;
        }else if(enemyDownRight.length == 0){
            if(rightI > 7 && rightJ > 7){
                checkForLeftDownward(item,item.i,item.j,boxes);
                return ;
            }
            else if(i == item.i && j == item.j){
                checkForLeftDownward(item,item.i,item.j,boxes);
                return;
            }else{
                const attackDownward = attackActiveEnemy(item,rightI,rightJ,boxes,"rd");
                checkForLeftDownward(item,item.i,item.j,attackDownward);
                return;
            }
        }

    }

    function checkForLeftDownward(item,i,j,boxes){
        let leftI = i;
        let leftJ = j;

        leftI = leftI + 1;
        leftJ = leftJ - 1;

        const enemyDownLeft = boxes.filter((item) => leftI <= 7 && leftJ >= 0 && Number(item.i) == leftI && Number(item.j) == leftJ && item.piece != null);
        if(enemyDownLeft.length > 0 && enemyDownLeft[0].playerId != "green"){
            checkForLeftDownward(item,leftI,leftJ,boxes);
            return;
        }else if(enemyDownLeft.length == 0){
            if(leftI > 7 && leftJ< 0){
                return;
            }else if(i == item.i && j == item.j){
                return;
            }else if(leftI <= 7 && leftJ >= 0){
                attackActiveEnemy(item,leftI,leftJ,boxes,"ld");
                return;
            }else{
                return;
            }
        }
    }



    function attackActiveEnemy(position,i,j,boxes,direction){
        const activeAttackZone = boxes.map((item) => Number(item.i) == i && Number(item.j) == j ? {...item,color:"bg-white",playerMoveActive:null,position:position,direction:direction}: item );
        setCheckersBoxes(activeAttackZone);
        return activeAttackZone;
    }



    function launchAttack(item){
        // attacker details
        let attackerposI = item.position.i;
        let attackerposJ = item.position.j;
        let attackerDirection = item.direction;

        let newPosI = item.i;
        let newPosJ = item.j;
        console.log(item);
        console.log(attackerDirection,"a");

        removeEnemyPiece(item,attackerposI,attackerposJ,newPosI,newPosJ,attackerDirection);

    }




    function removeEnemyPiece(item,aI,aJ,newI,newJ,direction){

        let newPostI = newI;
        let newPostJ = newJ;

        if(direction == "rd"){
            removeRightDownwardPiece(item,newPostI,newPostJ,aI,aJ,checkersBoxes);
            return;
        }
        else if(direction == "ld"){
            removeLeftDownwardPiece(item,newPostI,newPostJ,aI,aJ,checkersBoxes);
            return true;
        }else if(direction == "ru"){
            removeRightUpwardPiece(item,newPostI,newPostJ,aI,aJ,checkersBoxes);
            return;
        }else if(direction == "lu"){
            removeLeftUpwardPiece(item,newPostI,newPostJ,aI,aJ,checkersBoxes);
            return;
        }
        return false;
    }

    function removeRightDownwardPiece(item,i,j,attackerI,attackerJ,boxes){
        let rightI = i;
        let rightJ = j;

        rightI = rightI - 1;
        rightJ  = rightJ - 1;

        const enemypiece = boxes.filter((item)=> Number(item.i) == rightI && Number(item.j) == rightJ);
      
        if(rightI == attackerI && rightJ == attackerJ){
            let attackerposI = item.position.i;
            let attackerposJ = item.position.j;
            let attackerColor = item.position.color;
            let attackerDirection = item.direction;
            let attacker = item.position.piece;
            let attackerPlayerId = item.position.playerId;
            let newPosI = item.i;
            let newPosJ = item.j;

                    const emptyAttackerPos = boxes.map((item) => Number(item.i) == attackerposI && Number(item.j) == attackerposJ ? {...item,
                        active:null,color:"bg-orange-700",direction:null,piece:null,playerActive:null,playerMoveActive:null,position:null,stepActive:null
                    } : item)
                    const newCheckersPos = emptyAttackerPos.map((item) => Number(item.i) == newPosI && Number(item.j) == newPosJ ? {...item,color:attackerColor,direction:attackerDirection,
                        piece:attacker,playerId:attackerPlayerId,playerActive:null,stepActive:null,active:true
                    } : item);

        setCheckersBoxes(newCheckersPos);
        resetBoard(newCheckersPos);
            return;
        }else{
            enemyPieceboxes.push(enemypiece[0]);
            const newBoxes = boxes.map((item) => Number(item.i) == rightI && Number(item.j) == rightJ ? {...item,active:null,
                color:"bg-orange-700", direction:null,piece:null,playerActive:null,playerId:null,playerMoveActive:null,stepActive:null
            }: item);
            console.log(newBoxes,"new boxes");
            removeRightDownwardPiece(item,rightI,rightJ,attackerI,attackerJ,newBoxes);
            return;
        }
    }
    function removeLeftDownwardPiece(item,i,j,attackerI,attackerJ,boxes){
        let rightI = i;
        let rightJ = j;

        rightI = rightI - 1;
        rightJ  = rightJ + 1;

        const enemypiece = boxes.filter((item)=> Number(item.i) == rightI && Number(item.j) == rightJ);
       
        if(rightI == attackerI && rightJ == attackerJ){
            let attackerposI = item.position.i;
            let attackerposJ = item.position.j;
            let attackerColor = item.position.color;
            let attackerDirection = item.direction;
            let attacker = item.position.piece;
            let attackerPlayerId = item.position.playerId;
            let newPosI = item.i;
            let newPosJ = item.j;

                    const emptyAttackerPos = boxes.map((item) => Number(item.i) == attackerposI && Number(item.j) == attackerposJ ? {...item,
                        active:null,color:"bg-orange-700",direction:null,piece:null,playerActive:null,playerMoveActive:null,position:null,stepActive:null
                    } : item)
                    const newCheckersPos = emptyAttackerPos.map((item) => Number(item.i) == newPosI && Number(item.j) == newPosJ ? {...item,color:attackerColor,direction:attackerDirection,
                        piece:attacker,playerId:attackerPlayerId,playerActive:null,stepActive:null,active:true
                    } : item);

        setCheckersBoxes(newCheckersPos);
        resetBoard(newCheckersPos);
            return;
        }else{
            enemyPieceboxes.push(enemypiece[0]);
            const newBoxes = boxes.map((item) => Number(item.i) == rightI && Number(item.j) == rightJ ? {...item,active:null,
                color:"bg-orange-700", direction:null,piece:null,playerActive:null,playerId:null,playerMoveActive:null,stepActive:null
            }: item);
            console.log(newBoxes,"new boxes");
            removeLeftDownwardPiece(item,rightI,rightJ,attackerI,attackerJ,newBoxes);
            return;
        }
    }
    function removeRightUpwardPiece(item,i,j,attackerI,attackerJ,boxes){
        let rightI = i;
        let rightJ = j;

        rightI = rightI + 1;
        rightJ  = rightJ - 1;

        const enemypiece = boxes.filter((item)=> Number(item.i) == rightI && Number(item.j) == rightJ);
       
        if(rightI == attackerI && rightJ == attackerJ){
            let attackerposI = item.position.i;
            let attackerposJ = item.position.j;
            let attackerColor = item.position.color;
            let attackerDirection = item.direction;
            let attacker = item.position.piece;
            let attackerPlayerId = item.position.playerId;
            let newPosI = item.i;
            let newPosJ = item.j;

                    const emptyAttackerPos = boxes.map((item) => Number(item.i) == attackerposI && Number(item.j) == attackerposJ ? {...item,
                        active:null,color:"bg-orange-700",direction:null,piece:null,playerActive:null,playerMoveActive:null,position:null,stepActive:null
                    } : item)
                    const newCheckersPos = emptyAttackerPos.map((item) => Number(item.i) == newPosI && Number(item.j) == newPosJ ? {...item,color:attackerColor,direction:attackerDirection,
                        piece:attacker,playerId:attackerPlayerId,playerActive:null,stepActive:null,active:true
                    } : item);

        setCheckersBoxes(newCheckersPos);
        resetBoard(newCheckersPos);
            return;
        }else{
            enemyPieceboxes.push(enemypiece[0]);
            const newBoxes = boxes.map((item) => Number(item.i) == rightI && Number(item.j) == rightJ ? {...item,active:null,
                color:"bg-orange-700", direction:null,piece:null,playerActive:null,playerId:null,playerMoveActive:null,stepActive:null
            }: item);
            console.log(newBoxes,"new boxes");
            removeRightUpwardPiece(item,rightI,rightJ,attackerI,attackerJ,newBoxes);
            return;
        }
    }
    function removeLeftUpwardPiece(item,i,j,attackerI,attackerJ,boxes){
        let rightI = i;
        let rightJ = j;

        rightI = rightI + 1;
        rightJ  = rightJ + 1;

        const enemypiece = boxes.filter((item)=> Number(item.i) == rightI && Number(item.j) == rightJ);
       
        if(rightI == attackerI && rightJ == attackerJ){
            let attackerposI = item.position.i;
            let attackerposJ = item.position.j;
            let attackerColor = item.position.color;
            let attackerDirection = item.direction;
            let attacker = item.position.piece;
            let attackerPlayerId = item.position.playerId;
            let newPosI = item.i;
            let newPosJ = item.j;

                    const emptyAttackerPos = boxes.map((item) => Number(item.i) == attackerposI && Number(item.j) == attackerposJ ? {...item,
                        active:null,color:"bg-orange-700",direction:null,piece:null,playerActive:null,playerMoveActive:null,position:null,stepActive:null
                    } : item)
                    const newCheckersPos = emptyAttackerPos.map((item) => Number(item.i) == newPosI && Number(item.j) == newPosJ ? {...item,color:attackerColor,direction:attackerDirection,
                        piece:attacker,playerId:attackerPlayerId,playerActive:null,stepActive:null,active:true
                    } : item);

        setCheckersBoxes(newCheckersPos);
        resetBoard(newCheckersPos);
            return;
        }else{
            enemyPieceboxes.push(enemypiece[0]);
            const newBoxes = boxes.map((item) => Number(item.i) == rightI && Number(item.j) == rightJ ? {...item,active:null,
                color:"bg-orange-700", direction:null,piece:null,playerActive:null,playerId:null,playerMoveActive:null,stepActive:null
            }: item);
            console.log(newBoxes,"new boxes");
            removeLeftUpwardPiece(item,rightI,rightJ,attackerI,attackerJ,newBoxes);
            return;
        }
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