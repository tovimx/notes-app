import React, { useState } from "react";

export const NoteForm = (props) => {
    const { note = { title: "", text: "" }, onSubmit, onCancel } = props;
    const [noteInfo, setNoteInfo] = useState(note || { title: "", text: "" });

    return (
        <form>
            <div className="form-group">
                <label>Title:</label>
                <input
                    className="form-control"
                    data-testid="input-title"
                    name="title"
                    value={noteInfo.title}
                    onChange={(e) => {
                        setNoteInfo({ ...noteInfo, title: e.target.value });
                    }}
                />
            </div>
            <div className="form-group">
                <label>Note:</label>
                <textarea
                    className="form-control"
                    data-testid="input-text"
                    name="text"
                    value={noteInfo.text}
                    onChange={(e) => {
                        setNoteInfo({ ...noteInfo, text: e.target.value });
                    }}
                />
            </div>
            <div className="form-group">
                <input
                    type="button"
                    data-testid="cancel-note"
                    className="btn btn-default pull-right"
                    value="Cancel"
                    onClick={(e) => {
                        e.preventDefault();
                        onCancel();
                    }}
                />
                <input
                    type="submit"
                    data-testid="save-note"
                    className="btn btn-default pull-right"
                    value="Save"
                    onClick={(e) => {
                        e.preventDefault();
                        onSubmit(noteInfo);
                    }}
                />
            </div>
        </form>
    );
};
