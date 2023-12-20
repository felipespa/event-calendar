import { play, reset, useAppDispatch, useAppSelector } from "../store/tictactoeStore";

export function TicTacToe() {
  const state = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();

  return (
    <div className="ticTacToe">
      {state.winner === "=" && <div>Empate</div>}
      {(state.winner === "X" || state.winner === "O") && (
        <div>
          Vencedor: <strong>{state.winner}</strong>
        </div>
      )}
      {state.winner !== "?" && <div>Aguardando jogada de {state.nextPlayer}</div>}
      {state.winner === "?" && <div>Aguardando jogada de {state.nextPlayer}</div>}

      <table>
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td onClick={() => dispatch(play({ i, j }))} key={j}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => dispatch(reset())}>Reiniciar partida</button>
    </div>
  );
}
