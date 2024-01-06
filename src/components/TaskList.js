import React, {useReducer} from "react";
import {initialState, reducer} from "../reducers/todo.reducer.js";
import Task from "./Task.js";
import AddNewTask from "./AddNewTask.js";
import {Container, List} from "@mui/material";

const TaskList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Container maxWidth="sm" style={{minWidth: '420px'}}>
            <AddNewTask
                add={text => dispatch({type: "add", text: text})}
            />
            <List>
                {state.tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        remove={() => dispatch({type: "remove", id: task.id})}
                        edit={text => dispatch({type: "edit", id: task.id, text: text})}
                        toggle_checked={() => dispatch({type: "toggle_checked", id: task.id})}
                    />
                ))}
            </List>
        </Container>
    );
}

export default TaskList;