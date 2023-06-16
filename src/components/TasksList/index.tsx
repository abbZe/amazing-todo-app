import { TTasksObj, toggleAddNote } from '../../redux/tasks'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AddTagForm, TagsList, TaskPrioritySelector } from '..'
import { Link as RouterLink } from 'react-router-dom'
import {
  Link,
  Card,
  ListItem,
  Typography,
  CardActions,
  CardHeader,
  IconButton,
  Checkbox,
  Box,
  Alert,
  Tooltip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

type TasksListProps = {
  tasks: Array<TTasksObj>
  removeTaskHandler: (taskId: string) => void
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, taskId: string) => void
  addToFavHandler: (taskId: string) => void
  clickTagHandler: (tag: string) => void
  clickDeleteTagBtnHandler: (taskId: string, tagId: string) => void
  clickTaskTitleHandler: () => void
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTaskHandler,
  submitAddTagHandler,
  addToFavHandler,
  clickTagHandler,
  clickDeleteTagBtnHandler,
  clickTaskTitleHandler,
}) => {
  if (tasks.length > 0) {
    return (
      <Box>
        {tasks.map((task: TTasksObj, index: number) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {provided => (
              <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <Card sx={{ width: '100vw', p: '0.5rem' }}>
                  <CardHeader
                    title={
                      <Typography variant="h6" component="h2">
                        <Link component={RouterLink} to={`/task/${task.id}`} underline="none" variant="h5" onClick={clickTaskTitleHandler}>
                          {task.priority ? <Alert severity="warning">{task.priority} приоритет</Alert> : null}
                          {index + 1}. {task.taskTitleValue}
                        </Link>
                      </Typography>
                    }
                    subheader={task.dateOfCreate}
                  />
                  <CardActions>
                    <Tooltip title="Добавить в избранное">
                      <Checkbox
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                        checked={task.isFavorite}
                        onChange={() => addToFavHandler(task.id)}
                      />
                    </Tooltip>

                    <TaskPrioritySelector taskId={task.id} />

                    <Tooltip title="Удалить заметку">
                      <IconButton onClick={() => removeTaskHandler(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>

                  <AddTagForm submitAddTagHandler={submitAddTagHandler} taskId={task.id} />

                  <TagsList
                    taskId={task.id}
                    task={task}
                    clickDeleteTagBtnHandler={clickDeleteTagBtnHandler}
                    clickTagHandler={clickTagHandler}
                  />
                </Card>
              </ListItem>
            )}
          </Draggable>
        ))}
      </Box>
    )
  } else {
    return location.pathname === '/favorite' ? (
      <Alert severity="info">Пусто, самое время добавить что-нибудь в избранное</Alert>
    ) : (
      <Alert severity="info">Время создать заметку</Alert>
    )
  }
}
