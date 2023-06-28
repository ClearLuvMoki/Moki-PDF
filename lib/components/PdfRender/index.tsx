import React, {useEffect} from 'react';
import {StyledPdfRender} from "./styled/StyledPdfRender";
import type {PDFDocumentProxy} from "pdfjs-dist";
import {EventBus, NullL10n, PDFLinkService, PDFViewer} from "pdfjs-dist/web/pdf_viewer";


type PdfRenderProps = {
    pdfDocument: PDFDocumentProxy;
}
const PdfRender = (
    props: PdfRenderProps
) => {
    const {pdfDocument} = props;
    let $renderRef = React.createRef<HTMLDivElement>()
    let viewer = null;


    useEffect(() => {
        if (pdfDocument) {
            handleInitPdf();
        }
    }, [pdfDocument, $renderRef])


    const handleInitPdf = () => {
        console.log(pdfDocument, 'dddd')
        const eventBus = new EventBus();
        const linkService = new PDFLinkService({
            eventBus,
            externalLinkTarget: 2,
        });
        viewer = new PDFViewer({
            container: $renderRef?.current,
            eventBus,
            linkService,
            textLayerMode: 2,
            removePageBorders: true,
            l10n: NullL10n,
        })
        linkService.setDocument(pdfDocument);
        linkService.setViewer(viewer);
        viewer.setDocument(pdfDocument);
    }


    const handleAttachRef = (ref) => {
        $renderRef = ref;
        if (ref) {
            const {ownerDocument: doc} = ref;
        }
    }

    return (
        <StyledPdfRender ref={(ref: any) => handleAttachRef(ref)}>

        </StyledPdfRender>
    );
};

export default PdfRender;
