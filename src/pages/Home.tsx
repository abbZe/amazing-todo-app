import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../redux/tasks/selectors.ts'
import { TTasksObj, addTask, updateInputTaskBodyValue, updateInputTaskTitleValue, updateSearchInputValue } from '../redux/tasks'
import { Tasks } from '../containers'
import { v4 } from 'uuid'

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { inputTaskTitleValue, inputTaskBodyValue, inputSearchValue } = useSelector(selectTasks)

  const taskTitleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskTitleValue(inputValue))
  }
  const taskBodyInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskBodyValue(inputValue))
  }
  const createTaskHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputTaskTitleValue = (event.target[0] as HTMLInputElement).value
    const inputTaskBodyValue = (event.target[1] as HTMLInputElement).value
    const tasksObj: TTasksObj = {
      id: v4(),
      taskTitleValue: inputTaskTitleValue,
      taskBodyValue: inputTaskBodyValue,
      priority: '',
      tags: [],
      isFavorite: false,
    }

    if (inputTaskTitleValue && inputTaskBodyValue) {
      dispatch(addTask(tasksObj))
      dispatch(updateInputTaskTitleValue(''))
      dispatch(updateInputTaskBodyValue(''))
    } else alert('task input is empty')
  }
  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = event.target.value

    dispatch(updateSearchInputValue(searchInputValue))
  }

  return (
    <section>
      <SearchInput value={inputSearchValue} type="text" onChange={searchInputHandler} placeholder="ищем..." />

      <InputForm onSubmit={createTaskHandler}>
        <TaskTitleInput
          type="text"
          value={inputTaskTitleValue}
          onChange={taskTitleInputHandler}
          required
          autoFocus
          placeholder="введите заголовок..."
        />
        <TaskBodyInput
          type="text"
          value={inputTaskBodyValue}
          onChange={taskBodyInputHandler}
          required
          placeholder="введите задачу..."
        />
        <AddTaskBtn type="submit">Add</AddTaskBtn>
      </InputForm>

      <Tasks />
    </section>
  )
}

const InputForm = styled.form`
  /* Box model */
  display: flex;
  gap: 1rem;
`
const TaskTitleInput = styled.input``
const TaskBodyInput = styled.input``
const AddTaskBtn = styled.button``
const SearchInput = styled.input``
