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
  clickTagHandler: (tag: string) => void
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTaskHandler,
  selectPriorityHandler,
  submitAddTagHandler,
  addToFavHandler,
  clickTagHandler,
}) => (
  <>
    {tasks.map((task: TTasksObj, index: number) => (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {provided => (
          <ListOfTasks {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Link to={`/task/${task.id}`}>
              {index + 1}. {task.taskTitleValue} {task.priority} {task.isFavorite.toString()}
            </Link>
            <RemoveTaskBtn onClick={() => removeTaskHandler(index)}>Delete</RemoveTaskBtn>
            <AddToFavBtn onClick={() => addToFavHandler(index)}>add to fav</AddToFavBtn>
            <TaskPrioritySelector selectPriorityHandler={selectPriorityHandler} index={index} />
            <AddTagForm submitAddTagHandler={submitAddTagHandler} index={index} />
            <TagsList task={task} clickTagHandler={clickTagHandler} />
          </ListOfTasks>
        )}
      </Draggable>
    ))}
  </>
)

const RemoveTaskBtn = styled.button``
const AddToFavBtn = styled.button``
const ListOfTasks = styled.li`
  list-style: none;
`
