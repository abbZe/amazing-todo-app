import styled from 'styled-components'
import { TTasksObj } from '../../redux/tasks'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AddTagForm, TagsList, TaskPrioritySelector } from '..'
import { Link } from 'react-router-dom'

type TasksListProps = {
  tasks: Array<TTasksObj>
  removeTaskHandler: (index: number) => void
  selectPriorityHandler: (priorityValue: React.ChangeEvent<HTMLSelectElement>, index: number) => void
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, index: number) => void
  addToFavHandler: (index: number) => void
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTaskHandler,
  selectPriorityHandler,
  submitAddTagHandler,
  addToFavHandler,
}) => (
  <>
    {tasks.map((obj: TTasksObj, index: number) => (
      <Draggable key={obj.id} draggableId={obj.id} index={index}>
        {provided => (
          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Link to={`/task/${obj.id}`}>
              {index + 1}. {obj.taskValue} {obj.priority} {obj.isFavorite.toString()}
            </Link>
            <RemoveTaskBtn onClick={() => removeTaskHandler(index)}>Delete</RemoveTaskBtn>
            <AddToFavBtn onClick={() => addToFavHandler(index)}>add to fav</AddToFavBtn>
            <TaskPrioritySelector selectPriorityHandler={selectPriorityHandler} index={index} />
            <AddTagForm submitAddTagHandler={submitAddTagHandler} index={index} />
            <TagsList obj={obj} />
          </li>
        )}
      </Draggable>
    ))}
  </>
)

const RemoveTaskBtn = styled.button``
const AddToFavBtn = styled.button``
