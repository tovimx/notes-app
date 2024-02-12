import React, { useEffect, useState, useCallback } from "react";
import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";
import { Box, Container, Button } from "@mui/material";
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
            <Container maxWidth="sm">
                <Box>
                    <div className="col-md-12">
                        <h1>React notes</h1>
                    </div>
                </Box>
                <Box>
                    <div className="col-md-4">
                        <NotesList notes={notes} onSelect={onSelect} />
                    </div>
                    <div className="col-md-8">
                        <NoteForm
                            note={selected}
                            key={Date.now()}
                            onSubmit={onSubmit}
                            onCancel={onCancel}
                        />

                        <div>
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<SendIcon />}
                            >
                                New Note
                            </Button>
                        </div>
                    </div>
                </Box>
            </Container>
        </React.Fragment>
    );
};
