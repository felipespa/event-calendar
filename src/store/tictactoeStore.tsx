import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type CellValue = "X" | "O" | "";

type Winner = "X" | "O" | "?" | "=";

export interface ITicTacToeSate {
  nextPlayer: "X" | "O";
  winner: Winner;
  board: CellValue[][];
}

const initialState: ITicTacToeSate = {
  nextPlayer: "X",
  winner: "?",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

function getWinner(board: CellValue[][]): Winner {
  const players: ("X" | "O")[] = ["X", "O"];
  for (const p of players) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === p && board[i][1] === p && board[i][2] === p) {
        return p;
      }
      if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
        return p;
      }
      if (board[0][0] === p && board[1][1] === p && board[2][2] === p) {
        return p;
      }
      if (board[0][2] === p && board[1][1] === p && board[2][0] === p) {
        return p;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") return "?";
    }
  }

  return "=";
}

type ActionPlay = PayloadAction<{ i: number; j: number }>;

const slice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    play: (state, action: ActionPlay) => {
      const { i, j } = action.payload;
      if (state.board[i][j] === "" && state.winner === "?") {
        state.board[i][j] = state.nextPlayer;
        state.winner = getWinner(state.board);
        state.nextPlayer = state.nextPlayer === "X" ? "O" : "X";
      }
      return state;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const store = configureStore({
  reducer: {
    ticTacToe: slice.reducer,
  },
});

export const { play, reset } = slice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
