import * as PDFJS from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js'
import type {IPDFLinkService, IL10n} from "pdfjs-dist/types/web/interfaces"
import * as PDFViewer from 'pdfjs-dist/web/pdf_viewer';
import {PDFSinglePageViewer} from 'pdfjs-dist/web/pdf_viewer';
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useAsyncEffect} from "ahooks";

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker

type Props = {
    container: string;
    src: string;
    eventBus?: PDFViewer.EventBus
    linkService?: IPDFLinkService
    l10n?: IL10n;
    useOnlyCssZoom?: boolean;
    textLayerMode?: number;
    enablePrintAutoRotate?: boolean
    scale?: number

}

export const usePdf = (options: Props) => {
    const previewUrls = useRef<string[]>([])
    const urls = useRef<string[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        console.log(document.getElementById(options?.container)?.tagName, 'options.container')
    }, [options?.container])

    useEffect(() => {
        urls.current = []
        let pdfView = new PDFViewer.PDFViewer({
            container: document.getElementById("container") as HTMLDivElement,
            eventBus: options?.eventBus,
            linkService: options?.linkService,
            l10n: options?.l10n || null,
            // useOnlyCssZoom: options?.useOnlyCssZoom || false,
            // textLayerMode: options?.textLayerMode || 0,
            // enablePrintAutoRotate: options?.enablePrintAutoRotate || true,
        });
        setLoading(true)
        // const pdfDocument = await PDFJS.getDocument(options.src).promise
        // const task = new Array(pdfDocument.numPages).fill(null)
        // await Promise.all(task.map(async (_, i) => {
        //     const page = await pdfDocument.getPage(i + 1)
        //     const viewport = page.getViewport({scale: options.scale || 2})
        //     // const canvas = document.createElement('canvas')
        //     //
        //     // canvas.width = viewport.width
        //     // canvas.height = viewport.height
        //     // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        //     // const renderTask = page.render({
        //     //     canvasContext: ctx,
        //     //     viewport,
        //     // });
        //     // await renderTask.promise;
        //     // urls.current[i] = canvas.toDataURL('image/jpeg', 1)
        //     // previewUrls.current[i] = canvas.toDataURL('image/jpeg', 0.5)
        // }))
        setLoading(false)
    }, [])

    return {
        loading,
        urls: urls.current,
        previewUrls: previewUrls.current,
    }
}