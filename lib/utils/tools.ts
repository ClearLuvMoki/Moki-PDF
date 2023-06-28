export const getDocument = (elm: any): Document =>
    (elm || {}).ownerDocument || document;

export const findOrCreateContainerLayer = (
    container: HTMLElement,
    className: string
) => {
    const doc = getDocument(container);
    let layer = container.querySelector(`.${className}`);

    if (!layer) {
        layer = doc.createElement("div");
        layer.className = className;
        container.appendChild(layer);
    }

    return layer;
};
