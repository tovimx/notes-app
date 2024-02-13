import React, { useEffect, useState, useCallback } from "react";
import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";
import { Box, Container, Button, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SendIcon from "@mui/icons-material/Send";

export const App = (props) => {
    const { service } = props;

    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState(null);

    // (!) Get notes from service
    const getNotes = useCallback(async () => {
        const notes = await service.getNotes();
        setNotes(notes);
    }, [service]);

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    // Select new empty note
    function newNote() {
        setSelected({ title: "New Note", text: "" });
    }

    // Set note as selected
    function onSelect(note) {
        const newNotes = notes.map((item) => {
            if (item.id === note.id) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
            return item;
        });
        setNotes(newNotes);
        setSelected(note);
    }

    // Save note to service
    function onSubmit(note) {
        if (note.id) {
            service.saveNote(note);
            setSelected(note);
        } else {
            service.saveNote(note);
            setSelected({ title: "", text: "" });
        }
        getNotes();
    }

    // Unselect note
    function onCancel() {
        getNotes();
        setSelected({ title: "", text: "" });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <h1>Notes</h1>
                <Grid container spacing={2} direction="row">
                    <Grid xs={5}>
                        <NotesList notes={notes} onSelect={onSelect} />
                    </Grid>
                    <Grid xs={7}>
                        <NoteForm
                            note={selected}
                            key={Date.now()}
                            onSubmit={onSubmit}
                            onCancel={onCancel}
                        />

                        <div className="d-flex">
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<SendIcon />}
                                size="small"
                            >
                                New Note
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};
