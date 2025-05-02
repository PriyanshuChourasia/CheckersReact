import PlayGround from "./components/PlayGround";
import PlayerProvider from "./context/PlayerProvider";



const App = () =>{
  return(
    <>
      <PlayerProvider>
        <PlayGround/>
      </PlayerProvider>
    </>
  )
}


export default App;