import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../redux/tasks/selectors.ts'
import { TTasksObj, addTask, updateInputTaskValue, updateSearchInputValue } from '../redux/tasks'
import { Tasks } from '../containers'
import { v4 } from 'uuid'

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { inputTaskValue, inputSearchValue } = useSelector(selectTasks)

  const taskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskValue(inputValue))
  }
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputValue = (event.target[0] as HTMLInputElement).value
    const tasksObj: TTasksObj = {
      id: v4(),
      taskValue: inputValue,
      priority: '',
      tags: [],
    }

    if (inputValue) {
      dispatch(addTask(tasksObj))
      dispatch(updateInputTaskValue(''))
    } else alert('input is empty')
  }
  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = event.target.value

    dispatch(updateSearchInputValue(searchInputValue))
  }

  return (
    <section>
      <SearchInput value={inputSearchValue} type="text" onChange={searchInputHandler} placeholder="ищем..." />

      <InputForm onSubmit={submitHandler}>
        <TaskInput
          type="text"
          value={inputTaskValue}
          onChange={taskInputHandler}
          required
          autoFocus
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
const TaskInput = styled.input``
const AddTaskBtn = styled.button``
const SearchInput = styled.input``
