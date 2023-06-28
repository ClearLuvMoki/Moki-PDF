import styled from "styled-components";

export const StyledPdfRender = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  overflow: auto;

  div {
    width: 100%;
    height: 700px;
  }

  .textLayer {
    z-index: 2;
    opacity: 1;
    mix-blend-mode: multiply;
    display: flex;
  }

  .annotationLayer {
    position: absolute;
    top: 0;

    z-index: 3;
  }
`