import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { selectTasks } from '../../redux/tasks/selectors'
import styled from 'styled-components'
import { removeTaskFromFavorite, moveTaskFromFavToTasks, Priority, addPriorityFavorite, addTagToFavTask, addTaskToFavorite, TTasksObj } from '../../redux/tasks'
import React from "react";

export const FavoriteTasksList: React.FC = () => {
  const dispatch = useDispatch()
  const { favoriteTasks } = useSelector(selectTasks)

  const removeTaskBtnHandler = (indexOfTask: number) => {
    dispatch(removeTaskFromFavorite(indexOfTask))
  }
  const moveTaskBtnHandler = (indexOfTask: number) => {
    dispatch(moveTaskFromFavToTasks(indexOfTask))
  }
  const selectPriorityHandler = (value: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
    const priorityValue = value.target.value

    dispatch(addPriorityFavorite({ priorityValue, taskIndex }))
  }
  const submitAddTagHandler = (event: React.FormEvent<HTMLFormElement>, indexOfTask: number) => {
    event.preventDefault()
    // @ts-ignore
    const inputAddTagValue = event.target[0].value

    dispatch(addTagToFavTask({ inputAddTagValue, indexOfTask }))
    // @ts-ignore
    event.target[0].value = ''
  }

  return (
    <FavoriteTasksWrapper>
      <h2>Favorite tasks</h2>
      <ul>
        {favoriteTasks.map((tasksObj: TTasksObj, index: number) => (
          <li>
            <div>
              <UnordListItem>
                {index + 1}. {tasksObj.task} {tasksObj.priority}
              </UnordListItem>
              <MoveFromFavBtn onClick={() => moveTaskBtnHandler(index)}>F</MoveFromFavBtn>
              <RemoveTaskBtn onClick={() => removeTaskBtnHandler(index)}>D</RemoveTaskBtn>
              <SelectPriority
                defaultValue="choose"
                name="priority"
                onChange={priorityValue => selectPriorityHandler(priorityValue, index)}
              >
                <OptionPriority value="choose" disabled>--приоритет--</OptionPriority>
                <OptionPriority value="high">{Priority.high}</OptionPriority>
                <OptionPriority value="medium">{Priority.medium}</OptionPriority>
                <OptionPriority value="low">{Priority.low}</OptionPriority>
              </SelectPriority>
              <InputForm onSubmit={event => submitAddTagHandler(event, index)}>
                <AddTagInput placeholder="add some tags..." />
                <AddTagBtn type="submit">add tag</AddTagBtn>
              </InputForm>
              {tasksObj.tags.map((tag) => (
                <UnordTagList key={v4()}>
                  <UnordTagListItem>{tag}</UnordTagListItem>
                </UnordTagList>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </FavoriteTasksWrapper >
  )
}

const FavoriteTasksWrapper = styled.div`
  /* Box model */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const UnordListItem = styled.ul``
const MoveFromFavBtn = styled.button``
const RemoveTaskBtn = styled.button``
const SelectPriority = styled.select``
const OptionPriority = styled.option``
const AddTagInput = styled.input``
const InputForm = styled.form``
const AddTagBtn = styled.button``
const UnordTagList = styled.ul``
const UnordTagListItem = styled.li``
