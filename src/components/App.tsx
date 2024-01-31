import React, { useEffect, useState, useCallback } from "react";
import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";

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
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React notes</h1>
                </div>
            </div>
            <div className="row">
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
                        <button id="new-note" onClick={newNote}>
                            New Note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
