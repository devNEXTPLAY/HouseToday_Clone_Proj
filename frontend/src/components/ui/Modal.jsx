import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// onClose 전달 함수 예시
/***
 *  function handleClose() {
    navigate('../');
  }
 */

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
