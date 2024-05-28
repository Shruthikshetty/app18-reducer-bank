import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};
function reducer(state: StateType, action: ActionType): StateType {
  if (!state.isActive && action.type !== "open") return state;
  switch (action.type) {
    case "open":
      return { ...state, balance: 500, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };

    case "withdraw":
      return {
        ...state,
        balance:
          state.balance > 0 ? state.balance - action.payload : state.balance,
      };

    case "reqLoan":
      return {
        ...state,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
        loan: state.loan === 0 ? action.payload : state.loan,
      };

    case "payLoan":
      return {
        ...state,
        balance:
          state.balance > action.payload && state.loan === action.payload
            ? state.balance - action.payload
            : state.balance,
        loan:
          state.balance > action.payload && state.loan === action.payload
            ? state.loan - action.payload
            : state.loan,
      };

    case "close": {
      if (state.loan === 0 && state.balance === 0) {
        return initialState;
      } else {
        return state;
      }
    }

    default:
      throw new Error("invalied Type");
  }
}

function App() {
  const [{ isActive, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "open" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "reqLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "close" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;

//...............types ...........

type StateType = {
  balance: number;
  loan: number;
  isActive: boolean;
};

/* type ActionType = {
  type: "open" | "deposit" | "withdraw" | "reqLoan" | "close" | "payLoan";
  payload?: number;
}; */

type ActionType = Update | CloseOpen;

type CloseOpen = {
  type: "open" | "close";
};

type Update = {
  type: "deposit" | "withdraw" | "reqLoan" | "payLoan";
  payload: number;
};
