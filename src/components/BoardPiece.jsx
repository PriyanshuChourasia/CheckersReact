




const BoardPiece = ({i,j,color,onClick}) =>{
    return(
        <div onClick={onClick} i={i} j={j} className={` ${color ? `w-16 h-16 rounded-full cursor-pointer border-2 border-white ${color}` : ''}`}>
        </div>
    )
}



export default BoardPiece;