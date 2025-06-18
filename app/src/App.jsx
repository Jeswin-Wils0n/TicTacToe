import {useState} from 'react'
import Player from './Components/player'
import GameBoard from './Components/GameBoard'
import Logs from './Components/Logs';
import GameOver from './Components/GameOver';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [logsArray,setLogsArray] = useState([]);
  const [gameGrid, setGameGrid] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  const [playerNames, setPlayerNames] = useState({X:'Player 1', O:'Player 2'})

  const updateActivePlayer = (rowIdx,colIdx)=>{
    if(!gameGrid[rowIdx][colIdx]){
      const currentPlayer = activePlayer;

      setGameGrid((prevGameGrid) => {
          const updatedGameGrid = [...prevGameGrid.map(innerArr => [...innerArr])];
          updatedGameGrid[rowIdx][colIdx]=currentPlayer;
          return updatedGameGrid;
      });
      setLogsArray((prevLogsArray) => {
        const newObj = {
          square: {
            row : rowIdx,
            col : colIdx
          },
          player : currentPlayer
        }
        return [newObj, ...prevLogsArray]
      });
      setActivePlayer((previousPlayer => previousPlayer==='X' ? 'O' : 'X'));
      
    }
  }

  let result = {
    status : null,
    winner : null
  };
  if(logsArray.length>4){
    result = checkGameOver(gameGrid);
  }

  const restartGame = ()=>{
    setActivePlayer('X');
    setLogsArray([]);
    setGameGrid([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player name="player 1" symbol="X" isActive={activePlayer=='X'? true:false} updatePlayerNames={setPlayerNames}/>
          <Player name="player 2" symbol="O" isActive={activePlayer=='O'? true:false} updatePlayerNames={setPlayerNames}/>
        </ol>
      {(result.winner || result.status==='Draw') && <GameOver winner={playerNames[result.winner]} rematch={restartGame}/>}
      <GameBoard gameGrid={gameGrid} onSelect={updateActivePlayer}  />
      </div>
      <Logs logData={logsArray} />
    </main>
    
  )
}

function checkGameOver (GameBoard){
   try {
    const result = {
      status : 'Ongoing',
      winner : null
    }
    for(let i=0; i<3; i++){
      if(GameBoard[i][0] && GameBoard[i][0]===GameBoard[i][1] && GameBoard[i][1]===GameBoard[i][2]){
        result.status = 'Over';
        result.winner = GameBoard[i][0];
        return result;
      }
    }

    for(let j=0; j<3; j++){
      if(GameBoard[0][j] && GameBoard[0][j]===GameBoard[1][j] && GameBoard[1][j]===GameBoard[2][j]){
        result.status = 'Over';
        result.winner = GameBoard[0][j];
        return result;
      }
    }

    if(GameBoard[0][0] && GameBoard[0][0]===GameBoard[1][1] && GameBoard[1][1]===GameBoard[2][2]){
      result.status = 'Over';
      result.winner = GameBoard[0][0];
      return result;
    }

    if(GameBoard[0][2] && GameBoard[0][2]===GameBoard[1][1] && GameBoard[1][1]===GameBoard[2][0]){
      result.status = 'Over';
      result.winner = GameBoard[0][2];
      return result;
    }

    for (let row of GameBoard){
      if(row.includes(null)){
        return result;
      }
    }
    return {...result,status:'Draw'};

   } catch (error) {
    
   }
}

export default App