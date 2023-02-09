import "./App.css";
import {useState} from "react";

function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
function ShowMessage({message}){
  if(message){
    return <div className="subHeading"> Yay! </div>;
  }
  return null;
}

export default function Board(){

  const [squares, setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setX] = useState(true);

  function calculateWinner(squares){
    const combos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [2,4,6],
      [0,4,8]
    ];

    for(let i=0;i<combos.length;i++){
      let [a,b,c] = combos[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index){
    if(calculateWinner(squares) || squares[index]){
      return;
    }
    let squareCopy = squares.slice();

    if(xIsNext){
      squareCopy[index] = 'X';
    } else{
      squareCopy[index] = 'O';
    }
    setSquare(squareCopy);
    setX(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: "+winner;
  }else{
    status = "Next player: "+ (xIsNext? 'X':'O');
  }
  return (
    <>
    <div className="heading">Tic-Tac-toe</div>
    <div className="centerDiv">
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
          <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
          <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={()=> handleClick(3)} />
          <Square value={squares[4]} onSquareClick={()=> handleClick(4)} />
          <Square value={squares[5]} onSquareClick={()=> handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={()=> handleClick(6)} />
          <Square value={squares[7]} onSquareClick={()=> handleClick(7)} />
          <Square value={squares[8]} onSquareClick={()=> handleClick(8)} />
        </div>
      </div>
    </div>

    <ShowMessage message={winner}/>
    </>
  )
}
