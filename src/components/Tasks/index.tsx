import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Priority, TTasksObj, addPriority, addTagToTask, addTaskToFavorite, removeTask } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import React, { useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export const Tasks: React.FC = () => {
  const selectTaskRef = useRef<HTMLSelectElement>(null)
  const dispatch = useDispatch()

  const { tasks } = useSelector(selectTasks)

  const addToFavoriteBtnHandler = (taskIndex: number) => dispatch(addTaskToFavorite(taskIndex))
  const removeTaskHandler = (taskIndex: number) => dispatch(removeTask(taskIndex))
  const selectPriorityHandler = (value: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
    const priorityValue = value.target.value

    dispatch(addPriority({ priorityValue, taskIndex }))
  }
  const submitAddTagHandler = (event: React.FormEvent<HTMLFormElement>, indexOfTask: number) => {
    event.preventDefault()
    if (event.target) {
      // @ts-ignore
      const { value } = event.target[0] as HTMLInputElement
      const inputAddTagValue = value

      dispatch(addTagToTask({ inputAddTagValue, indexOfTask }))
    }
  }

  return (
    <div>
      {tasks.map((obj: TTasksObj, index: number) => (
        <Draggable key={obj.id} draggableId={obj.id} index={index}>
          {provided => (
            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              {index + 1}. {obj.taskValue} {obj.priority}
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
                <AddTagInput placeholder="add some tags..." required />
                <AddTagBtn type="submit">add tag</AddTagBtn>
              </InputForm>
              {obj.tags.map((tag, index) => (
                <UnordTagList key={index}>
                  <UnordTagListItem>{tag}</UnordTagListItem>
                </UnordTagList>
              ))}
            </li>
          )}
        </Draggable>
      ))}
    </div>
  )
}

const AddToFavoriteBtn = styled.button``
const RemoveTaskBtn = styled.button``
const SelectPriority = styled.select``
const OptionPriority = styled.option``
const AddTagInput = styled.input``
const InputForm = styled.form``
const AddTagBtn = styled.button``
const UnordTagList = styled.ul``
const UnordTagListItem = styled.li``
