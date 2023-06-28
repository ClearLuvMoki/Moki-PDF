import "pdfjs-dist/web/pdf_viewer.css";
import React, {useEffect, useState} from 'react';
import {StyledPdfRender} from "./styled/StyledPdfRender";
import type {PDFDocumentProxy} from "pdfjs-dist";
import {EventBus, NullL10n, PDFLinkService, PDFViewer} from "pdfjs-dist/web/pdf_viewer";
import ReactDOM, {createRoot} from "react-dom/client";
import {findOrCreateContainerLayer} from "../../utils/tools";


type PdfRenderProps = {
    pdfDocument: PDFDocumentProxy;
}
const PdfRender = (
    props: PdfRenderProps
) => {
    const {pdfDocument} = props;
    const $renderRef = React.useRef<HTMLDivElement>()
    let viewer = null;


    useEffect(() => {
        if (pdfDocument) {
            handleInitPdf();
        }
    }, [pdfDocument])


    const handleInitPdf = () => {
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

        const {ownerDocument: doc} = $renderRef?.current;
        eventBus.on("textlayerrendered", () => {
            handleRenderHighlights()
        });

        eventBus.on("pagesinit", () => {

        });
    }

    const handleGroupHighlightByPage = (highlights: any[]) => {

    }


    const handleRenderHighlights = () => {
        for (let pageNumber = 1; pageNumber <= pdfDocument?.numPages; pageNumber++) {
            const highlightLayer = handleHighlightLayer(pageNumber);
            if (highlightLayer) {
                ReactDOM.createRoot(highlightLayer)
                    .render(
                        <div>
                            {

                            }
                        </div>
                    )
            }
        }
    }


    const handleHighlightLayer = (page: number) => {
        const {textLayer} = viewer.getPageView(page - 1) || {};

        if (!textLayer) {
            return null;
        }

        return findOrCreateContainerLayer(
            textLayer.textLayerDiv,
            "PdfHighlighter__highlight-layer"
        );
    }


    return (
        <StyledPdfRender ref={$renderRef}>
            <div className="pdfViewer"/>
        </StyledPdfRender>

    );
};

export default PdfRender;
