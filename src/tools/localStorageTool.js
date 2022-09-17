export const getFromLocalStorage = () => JSON.parse(localStorage.getItem('todoList')) || []
export const setToLocalStorage = (value) => localStorage.setItem('todoList', JSON.stringify(value))