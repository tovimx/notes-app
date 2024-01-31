import React from "react";

export const NotesList = (props) => {
    const { notes = [], onSelect } = props;
    return (
        <div className="list-group">
            {notes.map((note) => {
                const { title, id, isActive } = note;
                return (
                    <div
                        key={id}
                        onClick={() => {
                            onSelect(note);
                        }}
                        data-testid="note-item"
                        className={`list-group-item ${
                            isActive ? "active" : ""
                        }`}
                    >
                        {title}
                    </div>
                );
            })}
        </div>
    );
};
