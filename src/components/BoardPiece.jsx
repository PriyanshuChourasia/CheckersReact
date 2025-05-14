




const BoardPiece = ({i,j,color,onClick,king}) =>{
    return(
        <div onClick={onClick} i={i} j={j} className={` ${color ? `w-16 h-16 rounded-full cursor-pointer border-2 text-center flex items-center justify-center border-white ${color}` : 'w-16 h-16'}`}>
            {king ? <span className="font-bold text-white text-2xl">K</span> : ''}
            <span className="text-white">{i}{j}</span>
        </div>
    )
}



export default BoardPiece;