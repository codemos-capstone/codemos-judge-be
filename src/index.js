import { createRoot } from 'react-dom/client';
import React from "react";
import Docs from "components/docs";
const docsElement = document.getElementById('docs')
const docs = createRoot(docsElement);
docs.render(
    <React.StrictMode>
        <Docs />
    </React.StrictMode>
);