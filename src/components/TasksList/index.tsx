import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Priority,
  TTasksObj,
  addPriority,
  addTagToTask,
  addTaskToFavorite,
  removeTask,
  updateAddTagInputValue,
  updateInputTaskValue,
  updateTasksOrder,
} from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import React, { useRef } from 'react'
import { v4 } from 'uuid'
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { SubmitFunction } from 'react-router-dom'

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
  const submitAddTagHandler = (event: SubmitEvent, indexOfTask: number) => {
    event.preventDefault()
    let { value } = event.target[0]
    const inputAddTagValue = value

    dispatch(addTagToTask({ inputAddTagValue, indexOfTask }))
  }
  const onDragEndHandler: OnDragEndResponder = (result: DropResult) => {
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem)
      dispatch(updateTasksOrder(items))
    }
  }

  return (
    <PlainTasksWrapper>
      <h2>Tasks</h2>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="tasksUl">
          {provided => (
            <ul id="tasksUl" className="tasksUl" {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((obj: TTasksObj, index: number) => (
                <Draggable key={obj.id} draggableId={obj.id} index={index}>
                  {provided => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {index + 1}. {obj.task} {obj.priority}
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
                      {obj.tags.map(tag => (
                        <UnordTagList key={v4()}>
                          <UnordTagListItem>{tag}</UnordTagListItem>
                        </UnordTagList>
                      ))}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </PlainTasksWrapper>
  )
}

const PlainTasksWrapper = styled.div`
  /* Box model */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const AddToFavoriteBtn = styled.button``
const RemoveTaskBtn = styled.button``
const SelectPriority = styled.select``
const OptionPriority = styled.option``
const AddTagInput = styled.input``
const InputForm = styled.form``
const AddTagBtn = styled.button``
const UnordTagList = styled.ul``
const UnordTagListItem = styled.li``
