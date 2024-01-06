import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {sanitize} from "../utils/sanitize";

const AddNewTask = ({add}) => {
    const [inputVal, setInputVal] = useState("");

    function handleSubmit() {
        add(sanitize(inputVal));
        setInputVal("");
    }

    return (
        <div>
            <TextField
                value={inputVal}
                label="My outstanding task is..."
                color="secondary"
                multiline
                onChange={e => setInputVal(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === "Enter") handleSubmit();
                }}
                style={{width: '80%'}}
            />
            <Button onClick={handleSubmit}
                    size="large"
                    variant="contained"
                    color="secondary"
                    disabled={!inputVal}
                    style={{height: '56px'}}
            >Add</Button>
        </div>
    );
}

export default AddNewTask;