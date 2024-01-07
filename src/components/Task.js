import {useState} from "react";
import {Checkbox, IconButton, ListItem, TextField, Tooltip} from "@mui/material";
import {Edit, DeleteForever, Close, Save, KeyboardDoubleArrowUp} from "@mui/icons-material";

const Task = ({task, remove, edit, toggle_checked, move_up}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    let taskContent;

    function handleSubmit() {
        edit(text);
        setIsEditing(false);
    }

    if (isEditing) {
        taskContent = (
            <>
                <TextField
                    value={text}
                    label="Edit"
                    multiline
                    rows={6}
                    color="secondary"
                    onChange={e => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                    style={{width: '86%'}}
                />
                <Tooltip title="Save">
                    <IconButton color="secondary" onClick={handleSubmit}>
                        <Save/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                    <IconButton color="secondary" onClick={() => setIsEditing(false)}>
                        <Close/>
                    </IconButton>
                </Tooltip>
            </>
        );
    } else {
        taskContent = (
            <>
                <Checkbox type="checkbox" id={task.id} checked={task.completed} color="secondary"
                          onChange={toggle_checked}/>
                <label htmlFor={task.id} style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    flexGrow: '1'
                }}>{task.text}</label>
                <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={remove}>
                        <DeleteForever/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={() => setIsEditing(true)}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Move to the top">
                    <IconButton color="defauld" onClick={move_up}>
                        <KeyboardDoubleArrowUp/>
                    </IconButton>
                </Tooltip>
            </>
        );
    }

    return (
        <ListItem
            style={{
                borderBottom: '1px solid lightgray',
                minHeight: '70px'
            }}>
            {taskContent}
        </ListItem>
    );
}

export default Task;