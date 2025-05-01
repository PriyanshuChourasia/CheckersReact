


const Box = ({i,j,boxColor,children}) =>{
    return(
        <div i={i} j={j} className={`w-20 h-20 flex justify-center items-center ${boxColor}`}>
            {children}
        </div>
    )
}


export default Box;