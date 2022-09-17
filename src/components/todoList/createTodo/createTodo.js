import React from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { v4 } from 'uuid';
import { AlertAppState } from "../../../appState/alertAppState";
import { TodoAppState } from "../../../appState/todoAppState";
import { LinkIconConfig } from "../../../config/linkIconConfig";
import { RouteConfig } from "../../../config/routeConfig";
import { AlertTypeEnum } from "../../../enums/alertTypeEnum";
import { setToLocalStorage } from "../../../tools";
import TodoForm from "../todoForm/todoForm";
import './createTodo.css';

const CreateTodo = () => {
  const navigate = useNavigate()
  const [todoState, setTodoState] = useRecoilState(TodoAppState)
  const [alertAppState, setAlertAppState] = useRecoilState(AlertAppState)

  const handleAddNewTodo = data => {
    const newData = {
      id: v4(),
      ...data
    }

    const newList = JSON.parse(JSON.stringify(todoState))
    newList.push(newData)
    setTodoState(todoState)
    setToLocalStorage(newList)
    setAlertAppState({ message: 'Successfully create task', type: AlertTypeEnum.success, open: true })
    handleGoBack()
  }

  const handleGoBack = () => {
    navigate(RouteConfig.list)
  }

  return <div className="createToDoContainer">
    <div className="body">
      <div className="header">
        <img src={LinkIconConfig.back} alt='back' className="iconBack" title="Go back" onClick={handleGoBack} />
        <div className="title">New Task</div>
        <div></div>
      </div>

      <TodoForm onAddNew={handleAddNewTodo} />
    </div>
  </div>;
};

export default CreateTodo;
