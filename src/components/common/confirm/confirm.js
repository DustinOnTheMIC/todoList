import React, { useState } from "react";
import * as ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import './confirm.css'

const Confirm = ({ onConfirm, onCancel, children }) => {
  const [openConfirm, setOpenConfirm] = useState(false)


  const handleCancel = () => {
    setOpenConfirm(false)
    onCancel && onCancel()
  }

  const handleConfirm = () => {
    setOpenConfirm(false)
    onConfirm && onConfirm()
  }

  return (
    <>
      <div onClick={() => setOpenConfirm(true)}>
        {children}
      </div>

      {
        openConfirm && ReactDOM.createPortal(
          <div className="confirmContainer">
            <div className="backDrop" onClick={() => setOpenConfirm(false)}></div>
            <div className="confirm">
              <div className="header title">
                Remove
              </div>
              <div className="confirmBody">
                Do you want to remove this task?

                <div>This action will delete the task out of the to do list</div>
              </div>
              <div className="confirmActions">
                <button className="btn btn-error" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-success" onClick={handleConfirm}>Confirm</button>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </>
  )
};

Confirm.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default Confirm;
