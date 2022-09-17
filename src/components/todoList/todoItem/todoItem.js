import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { AlertAppState } from "../../../appState/alertAppState";
import { TodoAppState } from "../../../appState/todoAppState";
import { AlertTypeEnum } from "../../../enums/alertTypeEnum";
import { combineClass, setToLocalStorage } from "../../../tools";
import Confirm from "../../common/confirm/confirm";
import TodoForm from "../todoForm/todoForm";
import './todoItem.css';

const TodoItem = ({ id = '', checked = false, onChangeCheck }) => {
  const [checkedState, setCheckedState] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [todoInfo, setTodoInfo] = useState({})
  const [todoState, setTodoState] = useRecoilState(TodoAppState)
  const [alertAppState, setAlertAppState] = useRecoilState(AlertAppState)

  useEffect(() => {
    const todo = todoState.find(item => item.id === id)
    todo && setTodoInfo(todo)
  }, [todoState])

  useEffect(() => {
    if (checked !== checkedState) {
      setCheckedState(checked)
    }
  }, [checked])

  const handleChange = e => {
    const { checked } = e.target
    setCheckedState(checked)
    onChangeCheck(id, checked)
  }

  const handleShowDetail = () => {
    setShowDetail(prev => !prev)
  }

  const handleUpdate = data => {
    const newState = JSON.parse(JSON.stringify(todoState))
    const index = newState.findIndex(item => item.id === data.id)
    if (index !== -1) {
      newState.splice(index, 1, data)
      setTodoState(newState)
      setToLocalStorage(newState)
      setShowDetail(false)
      setAlertAppState({ message: 'Update task successfully', type: AlertTypeEnum.success, open: true })
    }
  }

  const handleRemove = () => {
    const newState = JSON.parse(JSON.stringify(todoState))
    const index = newState.findIndex(item => item.id === id)
    if (index !== -1) {
      newState.splice(index, 1)
      setTodoState(newState)
      setToLocalStorage(newState)
      setAlertAppState({ message: 'Remove task successfully', type: AlertTypeEnum.success, open: true })
    }
  }

  return <div className="todoItemContainer">
    <div className="container">
      <div className="todoItemInfo">
        <input type='checkbox' id={id} onChange={handleChange} checked={checked} />
        <label htmlFor={id} className="label" title={todoInfo.name}>{todoInfo.name}</label>
      </div>

      <div className="todoItemActions">
        <button className="btn btn-info" onClick={handleShowDetail}>
          Detail
        </button>

        <Confirm onConfirm={handleRemove}>
          <button className="btn btn-error">
            Remove
          </button>
        </Confirm>
      </div>

      <div className={combineClass('detail', !showDetail ? 'hide' : '')}>
        <TodoForm todo={todoInfo} onUpdate={handleUpdate} />
      </div>
    </div>
  </div>
};

export default TodoItem;
