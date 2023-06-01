import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  addPriority,
  addTagToTask,
  addTaskToFav,
  removeTask,
  updateSearchTagResults,
  updateTasksOrder,
} from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors.ts'
import React from 'react'
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { TasksList } from '../../components'

export const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks, inputSearchValue, searchResults, searchTagResults } = useSelector(selectTasks)

  const onDragEndHandler: OnDragEndResponder = (result: DropResult) => {
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem)
      dispatch(updateTasksOrder(items))
    }
  }
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
  const addToFavHandler = (index: number) => {
    dispatch(addTaskToFav(index))
  }
  const clickTagHandler = (tag: string) => {
    dispatch(updateSearchTagResults(tag))
  }

  return (
    <PlainTasksWrapper>
      <h2>Tasks</h2>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="tasksUl">
          {provided => (
            <ul id="tasksUl" className="tasksUl" {...provided.droppableProps} ref={provided.innerRef}>
              {inputSearchValue ? (
                <>
                  <TasksList
                    tasks={searchResults}
                    removeTaskHandler={removeTaskHandler}
                    selectPriorityHandler={selectPriorityHandler}
                    submitAddTagHandler={submitAddTagHandler}
                    addToFavHandler={addToFavHandler}
                    clickTagHandler={clickTagHandler}
                  />
                  <br />
                  {/* tasks with same tag, shows when click on tag */}
                  {searchTagResults.length > 0 ? (
                    <TasksList
                      tasks={searchTagResults}
                      removeTaskHandler={removeTaskHandler}
                      selectPriorityHandler={selectPriorityHandler}
                      submitAddTagHandler={submitAddTagHandler}
                      addToFavHandler={addToFavHandler}
                      clickTagHandler={clickTagHandler}
                    />
                  ) : null}
                </>
              ) : (
                <>
                  <TasksList
                    tasks={tasks}
                    removeTaskHandler={removeTaskHandler}
                    selectPriorityHandler={selectPriorityHandler}
                    submitAddTagHandler={submitAddTagHandler}
                    addToFavHandler={addToFavHandler}
                    clickTagHandler={clickTagHandler}
                  />
                  <br />
                  {/* tasks with same tag, shows when click on tag */}
                  {searchTagResults.length > 0 ? (
                    <TasksList
                      tasks={searchTagResults}
                      removeTaskHandler={removeTaskHandler}
                      selectPriorityHandler={selectPriorityHandler}
                      submitAddTagHandler={submitAddTagHandler}
                      addToFavHandler={addToFavHandler}
                      clickTagHandler={clickTagHandler}
                    />
                  ) : null}
                </>
              )}
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