import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { PriorityEnum } from "../../../enums";
import { combineClass } from "../../../tools";
import './todoForm.css';

const TodoForm = (
  {
    todo,
    onUpdate,
    onAddNew
  }
) => {

  const todoScheme = yup.object().shape({
    name: yup.string().required('Title is required')
  })
  const { register, setValue, handleSubmit, formState: { errors, isSubmitted } } = useForm({
    resolver: yupResolver(todoScheme),
  })

  const [todoState, setTodoState] = useState(
    {
      name: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: PriorityEnum.normal,
    }
  )

  const priorityLabel = {
    [PriorityEnum.low]: 'Low',
    [PriorityEnum.normal]: 'Normal',
    [PriorityEnum.high]: 'High'
  }

  register('name')

  useEffect(() => {
    todo &&
      setTodoState(
        {
          name: todo.name || '',
          description: todo.description || '',
          dueDate: todo.dueDate,
          priority: todo.priority
        }
      )
    todo && setValue('name', todo.name)
  }, [todo])

  const handleChangeName = e => {
    const { value } = e.target
    setTodoState(prev => ({ ...prev, name: value }))
    setValue('name', value, { shouldValidate: isSubmitted })
  }

  const handleChangeDescription = e => {
    const { value } = e.target
    setTodoState(prev => ({ ...prev, description: value }))
  }

  const handleChangeDueDate = e => {
    const { value } = e.target
    setTodoState(prev => ({ ...prev, dueDate: new Date(value).toISOString().split('T')[0] }))
  }

  const handleChangePriority = e => {
    const { value } = e.target
    setTodoState(prev => ({ ...prev, priority: value }))
  }

  const submitTodo = () => {
    if (todo?.id) {
      handleSubmitUpdate()
    } else {
      handleSubmitAddNew()
    }
  }

  const handleSubmitAddNew = () => {
    onAddNew(todoState)
  }

  const handleSubmitUpdate = () => {
    const data = {
      id: todo?.id,
      ...todoState
    }

    onUpdate(data)
  }

  return <form className="todoFormContainer" onSubmit={handleSubmit(submitTodo)}>
    <div className="content">
      <div className="formContainer">
        <div className="form">
          <input
            className={combineClass(errors?.name ? 'inputError' : '')}
            type='text'
            placeholder="Add new task..."
            value={todoState.name}
            onChange={handleChangeName}
          />
          {errors?.name && <div className="errorsMessage">{errors?.name?.message}</div>}

          <div className="description">
            <div className="title p-0 w-100 des">Description</div>
            <textarea rows="4" className="textArea" value={todoState.description} onChange={handleChangeDescription}></textarea>
          </div>

          <div className="detailSetting">
            <div className="dueDate">
              <div className="title p-0">Due date</div>
              <input
                className="dateInput"
                type='date'
                min={new Date().toISOString().split("T")[0]}
                value={todoState.dueDate ? todoState.dueDate : new Date().toISOString().split('T')[0]}
                onChange={handleChangeDueDate}
              />
            </div>

            <div className="priority">
              <div className="title p-0">Priority</div>
              <select className="select" value={todoState.priority} onChange={handleChangePriority}>
                <option value={PriorityEnum.low}>{priorityLabel[PriorityEnum.low]}</option>
                <option value={PriorityEnum.normal}>{priorityLabel[PriorityEnum.normal]}</option>
                <option value={PriorityEnum.high}>{priorityLabel[PriorityEnum.high]}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button className="btn btn-success btnActionDetail" type="submit">{todo?.id ? 'Update' : 'Add'}</button>
  </form>
};

TodoForm.propTypes = {
  todo: PropTypes.object,
  onUpdate: PropTypes.func,
  onAddNew: PropTypes.func
};

export default TodoForm;
