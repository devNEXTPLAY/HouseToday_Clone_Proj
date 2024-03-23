import "./css/Confirm.scss";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Loadingindicator from "./Loadingindicator";

const TIMER = 5000;

export default function Confirm({ isOpen, onClose, onConfirm, title = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return createPortal(
    <>
      {isOpen && (
        <dialog className="modal" ref={dialog} onClose={onClose}>
          <Loadingindicator title={title} />
          <div id="confirmation-actions">
            <button onClick={onClose} className="button-text">
              아니요
            </button>
            <button onClick={onConfirm} className="button">
              네
            </button>
          </div>
        </dialog>
      )}
    </>,
    document.getElementById("modal")
  );
}
