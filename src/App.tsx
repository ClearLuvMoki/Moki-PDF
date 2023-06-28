import React from 'react';
import {PdfLoader, PdfRender} from "../lib"
import demoPdf from "/demo.pdf"

const App = () => {
    return (
        <PdfLoader
            data={demoPdf}
        >
            {
                (pdfDocument) => (
                    <PdfRender pdfDocument={pdfDocument}/>
                )
            }
        </PdfLoader>
    );
};

export default App;
