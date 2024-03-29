import { createContext, useEffect, useReducer } from "react";
import {initializer, TodoReducer} from "./reducers/todo.reducer";

export const TodoContext = createContext();

export const TodosProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(TodoReducer, [], initializer);

    useEffect(() => {
        localStorage.setItem("localTodos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider
            value={{
                todos,
                dispatch
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
