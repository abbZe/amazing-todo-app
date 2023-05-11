import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Priority, addPriority, addTagToTask, addTaskToFavorite, removeTask } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import { useRef, useState } from 'react'

export const TasksList: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(selectTasks)
  const selectTaskRef = useRef<HTMLSelectElement>(null)

  const addToFavoriteBtnHandler = (taskIndex: number) => dispatch(addTaskToFavorite(taskIndex))
  const removeTaskHandler = (taskIndex: number) => dispatch(removeTask(taskIndex))
  const selectPriorityHandler = (value: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
    const priorityValue = value.target.value

    dispatch(addPriority({ priorityValue, taskIndex }))
  }
  const submitAddTagHandler = (event: React.FormEvent<HTMLFormElement>, indexOfTask: number) => {
    event.preventDefault()
    const inputAddTagValue = event.target[0].value

    event.target[0].value = ''
    dispatch(addTagToTask({ inputAddTagValue, indexOfTask }))
  }

  return (
    <PlainTasksWrapper>
      <h2>Tasks</h2>
      <UnordTaskList>
        {tasks.map((obj, index: number) => (
          <div key={index + 1}>
            <UnordTaskListItem key={index}>
              {index + 1}. {obj.task} {obj.priority}
            </UnordTaskListItem>
            <AddToFavoriteBtn onClick={() => addToFavoriteBtnHandler(index)}>F</AddToFavoriteBtn>
            <RemoveTaskBtn onClick={() => removeTaskHandler(index)}>D</RemoveTaskBtn>
            <SelectPriority
              defaultValue="choose"
              ref={selectTaskRef}
              onChange={priorityValue => selectPriorityHandler(priorityValue, index)}
            >
              <OptionPriority value="choose" disabled>
                --приоритет--
              </OptionPriority>
              <OptionPriority value="high">{Priority.high}</OptionPriority>
              <OptionPriority value="medium">{Priority.medium}</OptionPriority>
              <OptionPriority value="low">{Priority.low}</OptionPriority>
            </SelectPriority>
            <InputForm onSubmit={event => submitAddTagHandler(event, index)}>
              <AddTagInput placeholder="add some tags..." />
              <AddTagBtn type="submit">add tag</AddTagBtn>
            </InputForm>
            {obj.tags.map((tag, index) => (
              <UnordTagList key={index + tag}>
                <UnordTagListItem>{tag}</UnordTagListItem>
              </UnordTagList>
            ))}
          </div>
        ))}
      </UnordTaskList>
    </PlainTasksWrapper>
  )
}

const PlainTasksWrapper = styled.div`
  /* Box model */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const UnordTaskList = styled.ul``
const UnordTaskListItem = styled.li``
const AddToFavoriteBtn = styled.button``
const RemoveTaskBtn = styled.button``
const SelectPriority = styled.select``
const OptionPriority = styled.option``
const AddTagInput = styled.input``
const InputForm = styled.form``
const AddTagBtn = styled.button``
const UnordTagList = styled.ul``
const UnordTagListItem = styled.li``
