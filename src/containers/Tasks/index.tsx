import { useDispatch, useSelector } from 'react-redux'
import {
  addTagToTask,
  toggleFav,
  removeTag,
  removeTask,
  updateSearchTagResults,
  updateTasksOrder,
  TTasksObj,
  TTagsObj,
  updateSearchTagValue,
  toggleAddNote,
} from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors.ts'
import React, { useCallback } from 'react'
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd'
import { TasksList } from '../../components'
import { Drawer, List } from '@mui/material'
import { v4 } from 'uuid'
import { useLocation } from 'react-router-dom'
import { AddTaskForm } from '../index.ts'
import { AnimatePresence, motion } from 'framer-motion'

export const Tasks: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { tasks, isAddNoteShows, inputSearchValue, searchResults, searchTagResults, themeMode } = useSelector(selectTasks)

  const onDragEndHandler: OnDragEndResponder = (result: DropResult) => {
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem)
      dispatch(updateTasksOrder(items))
    }
  }

  const removeTaskHandler = useCallback((taskId: string) => dispatch(removeTask(taskId)), [])

  const submitAddTagHandler = useCallback((event: React.FormEvent<HTMLFormElement>, taskId: string) => {
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
  }, [])

  const addToFavHandler = useCallback((taskId: string) => {
    dispatch(toggleFav(taskId))
  }, [])

  const clickTagHandler = useCallback((tag: TTagsObj) => {
    dispatch(updateSearchTagResults(tag.tagValue))
    dispatch(updateSearchTagValue(tag.tagValue))
  }, [])

  const clickDeleteTagBtnHandler = useCallback((taskId: string, tagId: string) => {
    dispatch(removeTag({ taskId, tagId }))
  }, [])

  const clickPlaceholderHandler = useCallback(() => {
    dispatch(toggleAddNote(!isAddNoteShows))
  }, [])

  const whichTasksWillDisplay = () => {
    const favoriteTasks: Array<TTasksObj> = []

    tasks.map(task => (task.isFavorite ? favoriteTasks.push(task) : null))

    return (
      searchTagResults.length > 0 && location.pathname === '/favorite'
        ? searchTagResults
        : searchTagResults.length > 0 && location.pathname === '/'
          ? searchTagResults
          : favoriteTasks && location.pathname === '/favorite'
            ? favoriteTasks
            : inputSearchValue
              ? searchResults
              : tasks
    )
  }

  return (
    <>
      <AddTaskForm />

      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="tasksUl">
          {provided => (
            <List sx={{ p: 0 }} id="tasksUl" className="tasksUl" {...provided.droppableProps} ref={provided.innerRef}>

              <AnimatePresence>
                <motion.div initial={{ y: '-1000px' }} animate={{ y: '0' }} exit={{ y: '-1000px' }} >
                  <TasksList
                    tasks={whichTasksWillDisplay()}
                    removeTaskHandler={removeTaskHandler}
                    addToFavHandler={addToFavHandler}
                    submitAddTagHandler={submitAddTagHandler}
                    clickTagHandler={clickTagHandler}
                    clickDeleteTagBtnHandler={clickDeleteTagBtnHandler}
                    clickPlaceholderHandler={clickPlaceholderHandler}
                    themeMode={themeMode}
                  />
                </motion.div>
              </AnimatePresence>

              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
