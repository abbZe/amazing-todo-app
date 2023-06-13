import { TTasksObj } from '../../redux/tasks'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AddTagForm, TagsList, TaskPrioritySelector } from '..'
import { Link } from 'react-router-dom'
import {
  Card,
  ListItem,
  Typography,
  CardActions,
  CardHeader,
  IconButton,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

type TasksListProps = {
  tasks: Array<TTasksObj>
  removeTaskHandler: (index: number) => void
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, index: number) => void
  addToFavHandler: (index: number) => void
  clickTagHandler: (tag: string) => void
  deleteTagHandler: (tag: string, index: number, indexOfTask: number) => void
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTaskHandler,
  submitAddTagHandler,
  addToFavHandler,
  clickTagHandler,
  deleteTagHandler,
}) => (
  <>
    {tasks.map((task: TTasksObj, index: number) => (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {provided => (
          <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Card sx={{ width: '100vw', p: '0.5rem' }}>
              <CardHeader
                title={
                  <Typography variant="h6" component="h2">
                    <Link to={`/task/${task.id}`}>
                      {index + 1}. {task.taskTitleValue} {task.priority ? `${task.priority} приоритет` : null}
                    </Link>
                  </Typography>
                }
                subheader={task.dateOfCreate}
              />
              <CardActions>
                <Checkbox
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                  checked={task.isFavorite}
                  onChange={() => addToFavHandler(index)}
                />
                <TaskPrioritySelector index={index} />
                <IconButton onClick={() => removeTaskHandler(index)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              <AddTagForm submitAddTagHandler={submitAddTagHandler} index={index} />
              <TagsList taskIndex={index} task={task} deleteTagHandler={deleteTagHandler} clickTagHandler={clickTagHandler} />
            </Card>
          </ListItem>
        )}
      </Draggable>
    ))}
  </>
)
