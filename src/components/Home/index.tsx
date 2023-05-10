import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../../redux/tasks/selectors'
import { TTasksObj, addTask, updateInputTaskValue } from '../../redux/tasks'
import { TasksList } from '../TasksList'
import { FavoriteTasksList } from '../FavoriteTasksList'

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

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { inputTaskValue } = useSelector(selectTasks)

  const taskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskValue(inputValue))
  }
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputValue = (event.target[0] as HTMLInputElement).value
    const tasksObj: TTasksObj = {
      task: inputValue,
      priority: '',
      tags: [],
    }

    if (inputValue) {
      dispatch(addTask(tasksObj))
      dispatch(updateInputTaskValue(''))
    } else alert('input is empty')
  }

  return (
    <section>
      <TodoWrapper>
        <InputForm onSubmit={submitHandler}>
          <TaskInput
            type="text"
            value={inputTaskValue}
            onChange={taskInputHandler}
            required
            autoFocus
          />
          <AddTaskBtn color="secondary" type="submit">
            Add
          </AddTaskBtn>
        </InputForm>
        <TasksWrapper>
          <TasksList />
          <FavoriteTasksList />
        </TasksWrapper>
      </TodoWrapper>
    </section>
  )
}
