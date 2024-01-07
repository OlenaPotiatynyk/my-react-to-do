import {render} from "@testing-library/react";
import {TodoContext} from "../../TodosProvider";
import TaskList from "../TaskList";
import AddNewTask from "../AddNewTask";
import Task from "../Task";

jest.mock('../AddNewTask');
jest.mock('../Task');

let tasks = [
    {
        "id": "Z1704583857519",
        "completed": false,
        "text": "perform testing"
    }
]
test('has component to add new task', () => {
    render(
        <TodoContext.Provider value={{todos: tasks}}>
            <TaskList/>
        </TodoContext.Provider>
    );
    expect(AddNewTask).toHaveBeenCalled();
    expect(AddNewTask).toHaveBeenCalledTimes(1);
});

test('has list of tasks created', () => {
    render(
        <TodoContext.Provider value={{todos: tasks}}>
            <TaskList/>
        </TodoContext.Provider>
    );
    expect(Task).toHaveBeenCalled();
    expect(Task).toHaveBeenCalledTimes(tasks.length);
    expect(Task).toHaveBeenCalledWith(
        expect.objectContaining({ task: tasks[0] }),
        expect.anything()
    )
});

test('has no tasks created', () => {
    render(
        <TodoContext.Provider value={{todos: []}}>
            <TaskList/>
        </TodoContext.Provider>
    );
    expect(Task).toHaveBeenCalledTimes(0);
});