


export default function GameBoard({ gameGrid, onSelect }) {
    
    

    return(
        <ol id="game-board">
            {gameGrid.map((row, rowIndex) => {
                return (
                    <li key={rowIndex} >
                        <ol>
                        {row.map((col, colIndex) => {
                            return (
                                <li key={colIndex} >
                                    <button onClick={()=>onSelect(rowIndex,colIndex)}>{col}</button>
                                </li>
                                
                            )
                        })}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}