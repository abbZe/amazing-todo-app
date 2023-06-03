import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../redux/tasks/selectors.ts'
import {
  TTasksObj,
  addTask,
  updateInputTaskBodyValue,
  updateInputTaskTitleValue,
  updateSearchInputValue,
} from '../redux/tasks'
import { Tasks } from '../containers'
import { v4 } from 'uuid'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from 'ckeditor5-custom-build'

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { inputTaskTitleValue, inputTaskBodyValue, inputSearchValue } = useSelector(selectTasks)

  const taskTitleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskTitleValue(inputValue))
  }
  const taskBodyInputHandler = (_: any, editor: CustomEditor) => {
    const data = editor.getData()

    dispatch(updateInputTaskBodyValue(data))
  }
  const createTaskHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const taskObj: TTasksObj = {
      id: v4(),
      taskTitleValue: "",
      taskBodyValue: "",
      priority: "",
      tags: [],
      isFavorite: false,
      dateOfCreate: "",
    }

    if (inputTaskTitleValue) {
      dispatch(addTask(taskObj))

      dispatch(updateInputTaskTitleValue(''))
      dispatch(updateInputTaskBodyValue(''))
    } else alert('task title is empty')
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
        <CKEditor editor={CustomEditor} data={inputTaskBodyValue} onChange={taskBodyInputHandler} />

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
const AddTaskBtn = styled.button``
const SearchInput = styled.input``
