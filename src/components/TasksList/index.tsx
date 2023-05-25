import styled from 'styled-components'
import { TTasksObj } from '../../redux/tasks'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TaskPrioritySelector } from '../TaskPrioritySelector'
import { AddTagForm } from '../AddTagForm'
import { TagsList } from '../TagsList'

type TasksListProps = {
  tasks: Array<TTasksObj>
  removeTaskHandler: (index: number) => void
  selectPriorityHandler: (priorityValue: React.ChangeEvent<HTMLSelectElement>, index: number) => void
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, index: number) => void
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTaskHandler,
  selectPriorityHandler,
  submitAddTagHandler,
}) => {

  return (
    <div>
      {tasks.map((obj: TTasksObj, index: number) => (
        <Draggable key={obj.id} draggableId={obj.id} index={index}>
          {provided => (
            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              {index + 1}. {obj.taskValue} {obj.priority}
              <RemoveTaskBtn onClick={() => removeTaskHandler(index)}>Delete</RemoveTaskBtn>
              <TaskPrioritySelector selectPriorityHandler={selectPriorityHandler} index={index} />
              <AddTagForm submitAddTagHandler={submitAddTagHandler} index={index} />
              <TagsList obj={obj} />
            </li>
          )}
        </Draggable>
      ))}
    </div>
  )
}

const RemoveTaskBtn = styled.button``
