import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { updateTasksOrder } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import React from 'react'
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { Tasks, SearchResults } from '..'

export const TasksList: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks, inputSearchValue } = useSelector(selectTasks)

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
              {inputSearchValue ? <SearchResults /> : <Tasks />}
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
