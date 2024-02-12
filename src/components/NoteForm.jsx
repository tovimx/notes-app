import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const NoteForm = (props) => {
    const { note = { title: "", text: "" }, onSubmit, onCancel } = props;
    const [noteInfo, setNoteInfo] = useState(note || { title: "", text: "" });

    return (
        <>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Title"
                        multiline
                        maxRows={4}
                        data-testid="input-title"
                        value={noteInfo.title}
                        onChange={(e) => {
                            setNoteInfo({ ...noteInfo, title: e.target.value });
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Note"
                        data-testid="input-text"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        value={noteInfo.text}
                        onChange={(e) => {
                            setNoteInfo({ ...noteInfo, text: e.target.value });
                        }}
                    />
                </div>
                <div>
                    <Button
                        variant="outlined"
                        data-testid="save-note"
                        disableElevation
                        onClick={(e) => {
                            e.preventDefault();
                            onSubmit(noteInfo);
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        disableElevation
                        onClick={(e) => {
                            e.preventDefault();
                            onCancel();
                        }}
                        data-testid="cancel-note"
                    >
                        Cancel
                    </Button>
                </div>
            </Box>
        </>
    );
};
