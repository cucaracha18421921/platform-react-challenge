import React from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

const StyledModal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 40px;
    `;

const Modal: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) => {
    return createPortal(
        <StyledModal onClick={onClick}>
            {children}
        </StyledModal>,
        document.getElementById("modal_root")!,
    );
}

  export default Modal;
