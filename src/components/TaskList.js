import React, {useContext} from "react";
import Task from "./Task.js";
import AddNewTask from "./AddNewTask.js";
import {Container, List} from "@mui/material";
import {TodoContext} from "../TodosProvider";

const TaskList = () => {
    const { todos, dispatch } = useContext(TodoContext);
    return (
        <Container maxWidth="sm" style={{minWidth: '420px'}}>
            <AddNewTask
                add={text => dispatch({type: "add", text: text})}
            />
            <List>
                {todos.map(task => (
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