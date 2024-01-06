import React, {useState} from "react";
import {Checkbox, IconButton, ListItem, TextField} from "@mui/material";
import {Edit, DeleteForever, Close, Save, DragIndicator} from "@mui/icons-material";

const Task = ({task, remove, edit, toggle_checked}) => {
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
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    rows={6}
                    color="secondary"
                    onChange={e => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                    style={{width: '86%'}}
                />
                <IconButton color="secondary" onClick={handleSubmit}><Save/></IconButton>
                <IconButton color="secondary" onClick={() => setIsEditing(false)}><Close/></IconButton>
            </>
        );
    } else {
        taskContent = (
            <>
                <Checkbox type="checkbox" id={task.id} checked={task.completed} color="secondary"
                          onChange={toggle_checked}/>
                <label htmlFor={task.id} style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    width: '80%'
                }}>{task.text}</label>
                <IconButton color="secondary" onClick={remove}><DeleteForever/></IconButton>
                <IconButton color="secondary" onClick={() => setIsEditing(true)}><Edit/></IconButton>
                <IconButton color="defauld" onClick={() => console.log('Add DnD')}><DragIndicator/></IconButton>
            </>
        );
    }

    return (
        <ListItem style={{
            borderBottom: '1px solid lightgray',
            minHeight: '70px'
        }}>
            {taskContent}
        </ListItem>
    );
}

export default Task;