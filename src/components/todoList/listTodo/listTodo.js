import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { TodoAppState } from "../../../appState/todoAppState";
import { LinkIconConfig } from "../../../config";
import { RouteConfig } from "../../../config/routeConfig";
import { getFromLocalStorage, removeAccents, setToLocalStorage } from "../../../tools";
import Confirm from "../../common/confirm/confirm";
import TodoItem from "../todoItem/todoItem";
import './listTodo.css';
import { AlertAppState } from "../../../appState/alertAppState";
import { AlertTypeEnum } from "../../../enums/alertTypeEnum";

const ListTodo = () => {
  const navigate = useNavigate()

  const [selectingTodo, setSelectingTodo] = useState([])
  const [todoStateSearch, setTodoStateSearch] = useState([])
  const [todoState, setTodoState] = useRecoilState(TodoAppState)
  const [alertAppState, setAlertAppState] = useRecoilState(AlertAppState)

  useEffect(() => {
    let list = getFromLocalStorage()
    list.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    setTodoState(list || [])
  }, [])

  useEffect(() => {
    setTodoStateSearch(todoState)

    const newList = selectingTodo.filter(
      item => {
        const index = todoState.findIndex(itemState => itemState.id === item)
        return index === -1 ? false : true
      }
    )
    setSelectingTodo(newList)
  }, [todoState])

  const handleChangeChecked = (id, checked) => {
    let selecting = [...selectingTodo]
    const index = selecting.findIndex(item => item === id)

    if (checked) {
      if (index === -1) {
        selecting.push(id)
      }
    } else {
      if (index !== -1) {
        selecting.splice(index, 1)
      }
    }
    setSelectingTodo(selecting)
  }

  const handleSearch = e => {
    const { key } = e
    if (key === 'Enter') {
      const { value } = e.target
      const list = JSON.parse(JSON.stringify(todoState))
      if (list?.length) {
        const newList = list.filter(
          item => removeAccents(item.name).includes(removeAccents(value))
        )

        setTodoStateSearch(newList)
      }
    }
  }

  const handleChangeSearch = e => {
    const { value } = e.target
    if (!value) {
      setTodoStateSearch(JSON.parse(JSON.stringify(todoState)) || [])
    }
  }

  const handleGoToCreate = () => {
    navigate(RouteConfig.create)
  }

  const handleRemoveTodo = () => {
    const newList = JSON.parse(JSON.stringify(todoState))

    selectingTodo.map(
      item => {
        const index = newList.findIndex(itemList => itemList.id === item)
        newList.splice(index, 1)
      }
    )
    setSelectingTodo([])
    setTodoState(newList)
    setToLocalStorage(newList)
    setAlertAppState({ message: 'Successfully remove task', type: AlertTypeEnum.success, open: true })
  }

  return <div className="listToDoContainer">
    <div className="body">
      <div className="title">
        Todo list
      </div>
      <div className="content">
        <div className="headerActions">
          <input type='text' className="search" placeholder="search" onKeyDown={handleSearch} onChange={handleChangeSearch}></input>
          <button className="btn btn-primary btnAddNew" onClick={handleGoToCreate}>
            <img src={LinkIconConfig.plus} />
            Add new
          </button>
        </div>

        <div className="todoItems">
          {
            todoStateSearch.length ? todoStateSearch.map(
              todo =>
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  checked={selectingTodo.includes(todo.id) || false}
                  onChangeCheck={handleChangeChecked}
                />
            )
              :
              <div>
                There is no task
              </div>
          }
        </div>
      </div>
    </div>
    {
      selectingTodo.length ?
        <div className="footerActions">
          <button className="btn btn-primary">Done</button>
          <Confirm onConfirm={handleRemoveTodo}>
            <button className="btn btn-error">Remove</button>
          </Confirm>
        </div>
        : ''
    }
  </div>;
};

export default ListTodo;
