import {useContext} from "react";
import Task from "./Task.js";
import AddNewTask from "./AddNewTask.js";
import {Container, List} from "@mui/material";
import {TodoContext} from "../TodosProvider";

const TaskList = () => {
    const { todos, dispatch } = useContext(TodoContext);
    return (
        <Container maxWidth="md" style={{minWidth: '420px'}}>
            <AddNewTask
                add={text => dispatch({type: "add", text: text})}
            />
            <List>
                {todos.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        index={index}
                        remove={() => dispatch({type: "remove", id: task.id})}
                        edit={text => dispatch({type: "edit", id: task.id, text: text})}
                        toggle_checked={() => dispatch({type: "toggle_checked", id: task.id})}
                        move_up={() => dispatch({type: "move_up", id: task.id})}
                    />
                ))}
            </List>
        </Container>
    );
}

export default TaskList;