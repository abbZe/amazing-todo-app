import { useDispatch, useSelector } from 'react-redux'
import {
  addTagToTask,
  toggleFav,
  removeTag,
  removeTask,
  updateSearchTagResults,
  updateTasksOrder,
  TTasksObj,
  toggleAddNote,
} from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors.ts'
import React from 'react'
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { TasksList } from '../../components'
import { List, Paper, Typography } from '@mui/material'
import { v4 } from 'uuid'
import { useLocation } from 'react-router-dom'

export const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { tasks, inputSearchValue, searchResults, searchTagResults, isAddNoteShows } = useSelector(selectTasks)

  const onDragEndHandler: OnDragEndResponder = (result: DropResult) => {
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem)
      dispatch(updateTasksOrder(items))
    }
  }
  const removeTaskHandler = (taskId: string) => dispatch(removeTask(taskId))
  const submitAddTagHandler = (event: React.FormEvent<HTMLFormElement>, taskId: string) => {
    event.preventDefault()

    const { value } = event.target[0] as HTMLInputElement
    const inputAddTagValue: string = value.trim().toLowerCase()

    const tagObj = {
      id: v4(),
      tagValue: inputAddTagValue,
    }

    if (event.target) {
      dispatch(addTagToTask({ tagObj, taskId }))
    }
  }
  const addToFavHandler = (taskId: string) => {
    dispatch(toggleFav(taskId))
  }
  const clickTagHandler = (tagValue: string) => {
    dispatch(updateSearchTagResults(tagValue))
  }
  const clickDeleteTagBtnHandler = (taskId: string, tagId: string) => {
    dispatch(removeTag({ taskId, tagId }))
  }
  const clickTaskTitleHandler = () => isAddNoteShows ? dispatch(toggleAddNote(!isAddNoteShows)) : null
  const whichTasksWillDisplay = () => {
    const favoriteTasks: Array<TTasksObj> = []

    tasks.map(task => (task.isFavorite ? favoriteTasks.push(task) : null))

    return favoriteTasks && location.pathname === '/favorite'
      ? favoriteTasks
      : inputSearchValue
        ? searchResults
        : searchTagResults.length > 0
          ? searchTagResults
          : tasks
  }

  return (
    <Paper elevation={0} sx={{ height: "100vh" }}>
      <Typography sx={{ textAlign: "center", position: "sticky", top: "0", zIndex: "999", backgroundColor: "inherit" }} variant="h4" component="h2">
        Заметки
      </Typography>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="tasksUl">
          {provided => (
            <List id="tasksUl" className="tasksUl" {...provided.droppableProps} ref={provided.innerRef}>
              <TasksList
                tasks={whichTasksWillDisplay()}
                removeTaskHandler={removeTaskHandler}
                addToFavHandler={addToFavHandler}
                submitAddTagHandler={submitAddTagHandler}
                clickTagHandler={clickTagHandler}
                clickDeleteTagBtnHandler={clickDeleteTagBtnHandler}
                clickTaskTitleHandler={clickTaskTitleHandler}
              />
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  )
}
