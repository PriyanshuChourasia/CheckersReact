


const Box = ({i,j,boxColor,children,onClick}) =>{
    return(
        <div onClick={onClick} i={i} j={j} className={`w-20 h-20 flex justify-center items-center ${boxColor}`}>
            {children}
        </div>
    )
}


export default Box;