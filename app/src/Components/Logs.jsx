export default function Logs({logData}){
    return (
        <ol id="log">
            {logData.map((log) => <li key={`${log.square.row},${log.square.col}`}>{`${log.player} was selected on ${log.square.row},${log.square.col}`}</li>)}
        </ol>
    )
}