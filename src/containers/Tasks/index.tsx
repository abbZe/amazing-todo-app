import { useDispatch, useSelector } from 'react-redux'
import {
  addTagToTask,
  addTaskToFav,
  removeTag,
  removeTask,
  updateSearchTagResults,
  updateTasksOrder,
} from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors.ts'
import React from 'react'
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { TasksList } from '../../components'
import { List, Paper, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

export const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { tasks, favoriteTasks, inputSearchValue, searchResults, searchTagResults } = useSelector(selectTasks)
  console.log(location.pathname)

  const onDragEndHandler: OnDragEndResponder = (result: DropResult) => {
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem)
      dispatch(updateTasksOrder(items))
    }
  }
  const removeTaskHandler = (taskIndex: number) => dispatch(removeTask(taskIndex))
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
  const deleteTagHandler = (tag: string, index: number, taskIndex: number) => {
    dispatch(removeTag([tag, index, taskIndex]))
  }
  const whichTasksWillDisplay = () => (
    location.pathname === '/favorite'
      ? favoriteTasks
      : inputSearchValue
        ? searchResults
        : searchTagResults.length > 0
          ? searchTagResults
          : tasks
  )

  return (
    <Paper elevation={2} sx={{ p: '1rem' }}>
      <Typography variant="h4" component="h2">
        Заметки
      </Typography>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="tasksUl">
          {provided => (
            <List id="tasksUl" className="tasksUl" {...provided.droppableProps} ref={provided.innerRef}>
              <TasksList
                tasks={whichTasksWillDisplay()}
                removeTaskHandler={removeTaskHandler}
                submitAddTagHandler={submitAddTagHandler}
                addToFavHandler={addToFavHandler}
                clickTagHandler={clickTagHandler}
                deleteTagHandler={deleteTagHandler}
              />
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  )
}
