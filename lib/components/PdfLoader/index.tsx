import React, {useEffect, useState} from 'react';
import {getDocument, GlobalWorkerOptions, PDFDocumentProxy} from "pdfjs-dist/legacy/build/pdf";
import {DefaultWorkerSrc} from "../../constants";
import ErrorBoundary from "../ErrorBoundary";
import {StyledPdfLoader} from "./styled/StyledPdfLoader";


type PdfLoaderProps = {
    data: string;
    workerSrc?: string;
    beforeLoad?: JSX.Element;
    errorMessage?: JSX.Element;
    cMapUrl?: string;
    cMapPacked?: boolean;
    children: (pdfDocument: PDFDocumentProxy) => JSX.Element;
    onError?: (error: Error) => void;
}

type State = {
    pdfDocument: PDFDocumentProxy | null;
    error?: Error | null;
}

const PdfLoader = (
    props: PdfLoaderProps
) => {
    const {
        data,
        cMapUrl,
        cMapPacked,
        workerSrc = DefaultWorkerSrc,
        children
    } = props
    const [state, setState] = useState<State>({
        pdfDocument: null,
        error: null
    })
    const documentRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        if (data) {
            handleLoadPdf();
        }
    }, [data])


    const handleLoadPdf = () => {
        const {ownerDocument = document} = documentRef.current || {};
        const {pdfDocument: discardedDocument} = state;

        if (typeof workerSrc === "string") {
            GlobalWorkerOptions.workerSrc = workerSrc;
        }

        Promise.resolve()
            .then(() => discardedDocument && discardedDocument.destroy())
            .then(() => {
                if (!data) {
                    return;
                }

                return getDocument(data)
                    .promise
                    .then((pdfDocument) => {
                        setState((prevState) => ({
                            ...prevState,
                            pdfDocument
                        }))
                    });
            })

    }


    return (
        <ErrorBoundary>
            <StyledPdfLoader ref={documentRef}/>
            {children(state?.pdfDocument)}
        </ErrorBoundary>
    );
};

export default PdfLoader;
