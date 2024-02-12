import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import "./index.css";
import "./App.css";

import { NotesService } from "./services/notes";
import notes from "./mocks/notes.json";
const svc = new NotesService(notes);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App service={svc} />
    </React.StrictMode>
);
