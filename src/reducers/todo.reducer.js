export const initialState = {
    tasks: []
};

export const initializer = (initialValue = initialState.tasks) =>
    JSON.parse(localStorage.getItem("localTodos")) || initialValue;

export const TodoReducer = (state, action) => {
    switch (action.type) {
        case "add": {
            const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            const uniqId = randLetter + Date.now();
            const newTask = {
                id: uniqId,
                completed: false,
                text: action.text,
            };
            return [...state, newTask]
        }
        case "edit":
            return state.map((item) =>
                item.id === action.id
                    ? {
                        ...item,
                        text: action.text
                    }
                    : item
            )
        case "remove":
            return state.filter((item) =>
                item.id !== action.id);
        case "toggle_checked":
            return state.map((item) =>
                item.id === action.id
                    ? {
                        ...item,
                        completed: !item.completed
                    }
                    : item
            )
        default:
            return state;
    }
};