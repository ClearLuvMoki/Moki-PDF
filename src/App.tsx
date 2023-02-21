import React, {useEffect, useState} from 'react';
import * as PDFJS from 'pdfjs-dist'
import * as PDFViewer from 'pdfjs-dist/web/pdf_viewer';
import {TextLayerBuilder} from 'pdfjs-dist/web/pdf_viewer';
import {Button, Input, Space} from "antd";
import {ZoomInOutlined, ZoomOutOutlined} from "@ant-design/icons"

// const DEFAULT_URL = 'https://www.africau.edu/images/default/sample.pdf'
const DEFAULT_URL = require("./demo.pdf")


const App = () => {
    const pageRenderRef: any = React.createRef()
    const textLayerRef: any = React.createRef()
    const pdfLinkService: any = React.createRef()
    const pdfViewer: any = React.createRef();
    const [loading, setLoading] = useState(true)
    const DEFAULT_SCALE_DELTA = 1.1;
    const MIN_SCALE = 0.25;
    const MAX_SCALE = 10.0;

    useEffect(() => {
        init();
        open();
    }, [])


    const init = () => {
        console.log('PDF init')
        const eventBus = new PDFViewer.EventBus();
        let linkService = new PDFViewer.PDFLinkService({
            eventBus: eventBus,
        });

        pdfViewer.current = new PDFViewer.PDFViewer({
            container: pageRenderRef?.current,
            eventBus: eventBus,
            linkService: linkService,
            l10n: null,
            useOnlyCssZoom: false,
            textLayerMode: 0,
            enablePrintAutoRotate: true,
        });
        linkService.setViewer(pdfViewer);
        pdfLinkService.current = linkService;
    }

    const open = () => {
        PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
        const loadingTask = PDFJS.getDocument({
            url: DEFAULT_URL,
            maxImageSize: 1024 * 1024,
            cMapUrl: "https://unpkg.com/pdfjs-dist@2.2.228/cmaps/",
            cMapPacked: true,
        });
        loadingTask.onProgress = (progressData: any) => {
            console.log(progressData, 'progressData')

        };
        loadingTask.promise
            .then(
                async (pdfDocument) => {
                    pdfViewer.current.setDocument(pdfDocument)
                    pdfLinkService.current.setDocument(pdfDocument)
                    console.log(pdfDocument.getData(), ' pdfDocument.getData()')
                }
            )
    }

    const zoomIn = () => {
        let newScale = pdfViewer.current?.currentScale;
        if (newScale < MAX_SCALE) {
            newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
            newScale = Math.ceil(newScale * 10) / 10;
            newScale = Math.min(MAX_SCALE, newScale);
        }
        pdfViewer.current.currentScale = newScale;
    }

    const zoomOut = () => {
        let newScale = pdfViewer.current?.currentScale;
        if (MIN_SCALE < newScale) {
            newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
            newScale = Math.floor(newScale * 10) / 10;
            newScale = Math.max(MIN_SCALE, newScale);
        }
        pdfViewer.current.currentScale = newScale;
    }

    const toPage = (page: string | number) => {
        if (page) {
            pdfViewer.current.currentPageNumber = Number(page)
        }
    }

    return (
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center"}}>
            <Space style={{width: "100%", height: "30px", position: "fixed", zIndex: 10}}>
                <Button
                    onClick={() => {
                        zoomIn();
                    }}>
                    <ZoomInOutlined/>
                </Button>
                <Button
                    onClick={() => {
                        zoomOut();
                    }}>
                    <ZoomOutOutlined/>
                </Button>
                <Input
                    onPressEnter={(e) => {
                        // @ts-ignore
                        toPage(e.target.value)
                    }}
                />
            </Space>
            <div id="viewerContainer" ref={pageRenderRef} style={{position: "absolute"}}>
                <div id="viewer" className="pdfViewer"></div>
                <div className="textLayer" ref={textLayerRef}></div>
            </div>
        </div>
    );
};

export default App;
