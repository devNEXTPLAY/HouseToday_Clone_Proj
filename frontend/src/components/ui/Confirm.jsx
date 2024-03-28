import classes from "./css/Confirm.module.css";

import { createPortal } from "react-dom";
import Loadingindicator from "./Loadingindicator";

/***
 * offConfirm: 취소 버튼을 눌렀을 때 실행되는 함수 useConfirm의 offConfirm과 연결
 * onSure: 확인 버튼을 눌렀을 때 실행되는 함수 부모 컴포넌트의 axios 요청 함수와 연결
 */

export default function Confirm({ title = "기본 제목", description = "기본 내용", offConfirm, onSure }) {
  return createPortal(
    <div className={classes.modal}>
      <div className={classes.confirm}>
        <div className={classes.texts}>
          <Loadingindicator />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className={classes.buttons}>
          <button onClick={offConfirm} className="button-text" value={false}>
            아니요
          </button>
          <button onClick={onSure} className="button" value={true}>
            네
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
