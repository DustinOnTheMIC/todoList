import React, { useEffect, useRef, useState } from "react";
import * as ReactDOM from 'react-dom';
import { combineClass } from "../../../tools";
import './alert.css'
import { AlertAppState } from "../../../appState/alertAppState";
import { useRecoilState } from 'recoil';
import { AlertTypeEnum } from "../../../enums/alertTypeEnum";

const Alert = () => {
  const [alertAppState, setAlertAppState] = useRecoilState(AlertAppState)
  const [openState, setOpenState] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    alertAppState.open !== openState && setOpenState(alertAppState.open)
  }, [alertAppState])

  useEffect(() => {
    timerRef.current && clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setOpenState(false)
      setAlertAppState(prev => ({ ...prev, open: false }))
    }, 3000);

    return () => clearTimeout(timerRef.current)
  }, [openState])

  return (
    openState && ReactDOM.createPortal(
      <div className="alertContainer">
        <div className={combineClass("alertBody", alertAppState.type ? alertAppState.type : AlertTypeEnum.success)}>
          {alertAppState.message}
        </div>
      </div>,
      document.body
    )
  )
};

export default Alert;
