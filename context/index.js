import { createContext, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGOUT":
            action.payload = null;
        case "LOGIN":
            return {
                ...state,
                error: "",
                user: action.payload,
                transaction: null,
                loading: false,
            };
        case "LOAD":
            return { ...state, error: "", loading: true };
        case "LOAD_TRANSACTION":
            return { ...state, error: "", tload: true };
        case "TRANSACTION_FETCH_ERROR":
            return {
                ...state,
                transaction: null,
                error: action.payload,
                tload: false,
            };
        case "TRANSACTION_FETCHED":
            return {
                ...state,
                error: "",
                transaction: action.payload,
                tload: false,
            };
        default:
            return state;
    }
};

const intialState = {
    error: "",
    user: null,
    loading: true,
    transaction: null,
    tload: false,
};

const Context = createContext({});

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
