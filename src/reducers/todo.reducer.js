export const initialState = {
    tasks: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "add":
        {
            const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            const uniqId = randLetter + Date.now();
            const newTask = {
                id: uniqId,
                completed: false,
                text: action.text,
            };
            return {
                tasks: [...state.tasks, newTask],
            };
        }
        case "edit":
        {
            const idx = state.tasks.findIndex(t => t.id === action.id);
            const todo = Object.assign({}, state.tasks[idx]);
            todo.text = action.text;
            const tasks = Object.assign([], state.tasks);
            tasks.splice(idx, 1, todo);
            return {
                tasks: tasks,
            };
        }
        case "remove":
        {
            const idx = state.tasks.findIndex(t => t.id === action.id);
            const tasks = Object.assign([], state.tasks);
            tasks.splice(idx, 1);
            return {
                tasks: tasks,
            };
        }
        case "toggle_checked":
        {
            const idx = state.tasks.findIndex(t => t.id === action.id);
            const todo = Object.assign({}, state.tasks[idx]);
            todo.completed = !todo.completed;
            const tasks = Object.assign([], state.tasks);
            tasks.splice(idx, 1, todo);
            return {
                tasks: tasks,
            };
        }
        default:
            return state;
    }
};