import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../../redux/tasks/selectors'
import { addTask, updateInputTaskValue } from '../../redux/tasks'
import { TasksList } from '../TasksList'
import { FavoriteTasksList } from '../FavoriteTasksList'

const TodoWrapper = styled.div`
  background-color: #333333;
  color: #ffffff;
`
const InputForm = styled.form``
const TasksWrapper = styled.div``
const AddTaskBtn = styled.button``

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { inputTaskValue, tasks } = useSelector(selectTasks)

  const taskInput = useRef<HTMLInputElement>(null)
  const inputValue = taskInput?.current?.value

  const taskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskValue(inputValue))
  }
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (inputValue) {
      dispatch(addTask(inputValue))
      dispatch(updateInputTaskValue(''))
    } else alert('input is empty')
  }

  return (
    <section>
      <TodoWrapper>
        <InputForm onSubmit={submitHandler}>
          <input
            type="text"
            value={inputTaskValue}
            onChange={taskInputHandler}
            ref={taskInput}
            placeholder="write a task..."
            required
          />
          <AddTaskBtn type="submit">Add</AddTaskBtn>
        </InputForm>
        <TasksWrapper>
          <TasksList tasks={tasks} />
          <FavoriteTasksList />
        </TasksWrapper>
      </TodoWrapper>
    </section>
  )
}
