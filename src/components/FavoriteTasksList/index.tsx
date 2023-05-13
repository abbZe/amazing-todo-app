import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { selectTasks } from '../../redux/tasks/selectors'
import styled from 'styled-components'
import { removeTaskFromFavorite, moveTaskFromFavToTasks, Priority, addPriorityFavorite, addTagToFavTask, updateFavTasksOrder, TTasksObj, updateAddTagInputValue } from '../../redux/tasks'
import React from "react";
import { DragDropContext, Draggable, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'

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
    let { value } = event.target[0]
    const inputAddTagValue = value

    dispatch(addTagToFavTask({ inputAddTagValue, indexOfTask }))
  }
  const onDragEndHandler: OnDragEndResponder = (result: DropResult) => {
    const items = Array.from(favoriteTasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem)
      dispatch(updateFavTasksOrder(items))
    }
  }

  return (
    <FavoriteTasksWrapper>
      <h2>Favorite tasks</h2>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="favTasksUl">
          {provided => (
            <ul id="favTasksUl" className="favTasksUl" {...provided.droppableProps} ref={provided.innerRef}>
              {favoriteTasks.map((obj: TTasksObj, index: number) => (
                <Draggable key={obj.id} draggableId={obj.id} index={index}>
                  {provided => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {index + 1}. {obj.task} {obj.priority}
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
                        <AddTagInput placeholder="add some tags..." required />
                        <AddTagBtn type="submit">add tag</AddTagBtn>
                      </InputForm>
                      {obj.tags.map((tag) => (
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
