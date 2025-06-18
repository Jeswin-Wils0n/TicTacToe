import {useState} from 'react'

export default function Player({ name, symbol, isActive, updatePlayerNames }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  const [validationError, setValidationError] = useState('')

  const handleEdit = () => {
    if (isEditing){
      if(playerName.trim()===''){
        setValidationError('Player name cannot be empty!');
        return;
      }


      updatePlayerNames((prev)=>{
      return {...prev, [symbol] : playerName}
    })
    }
    setIsEditing((prev)=>{return !prev});
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPlayerName(value);
    
  }



  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {isEditing ? (<><input type="text"  value={playerName} required onChange={handleChange} /> 
        {validationError && (<span></span>)} </>) : 
        <span className="player-name">{playerName}</span>}
        
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? `Save` : `Edit`}</button>
    </li>
  )
}