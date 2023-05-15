import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../../redux/tasks/selectors'
import { TTasksObj, addTask, updateInputTaskValue, updateSearchInputValue } from '../../redux/tasks'
import { TasksList } from '../TasksList'
import { FavoriteTasksList } from '../FavoriteTasksList'
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
      <TodoWrapper>
        <InputForm>
          <SearchInput value={inputSearchValue} type="text" onChange={searchInputHandler} placeholder="ищем..." />
        </InputForm>
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
        <TasksWrapper>
          <TasksList />
          <FavoriteTasksList />
        </TasksWrapper>
      </TodoWrapper>
    </section>
  )
}

const TodoWrapper = styled.div`
  /* Box model */
  display: grid;
  place-content: center;
  padding: 2rem;
  gap: 1rem;
  /* Typography */
  color: #268bd2;
  font-size: 1.4rem;
  /* Visual */
  background-color: #262626;
`
const InputForm = styled.form`
  /* Box model */
  display: flex;
  gap: 1rem;
`
const TasksWrapper = styled.div`
  /* Box model */
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`
const TaskInput = styled.input``
const AddTaskBtn = styled.button``
const SearchInput = styled.input``
