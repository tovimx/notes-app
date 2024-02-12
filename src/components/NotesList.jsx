import React from "react";
import {
    List,
    ListItem,
    IconButton,
    ListItemButton,
    Checkbox,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const NotesList = (props) => {
    const { notes = [], onSelect } = props;
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            {notes.map((note, index) => {
                const { title, id, isActive } = note;
                const labelId = `checkbox-list-label-${index}`;

                return (
                    <ListItem
                        key={id}
                        data-testid="note-item"
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                <DeleteIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton
                            role={undefined}
                            onClick={() => {
                                onSelect(note);
                            }}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    // checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`Line item ${index + 1}`}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};
