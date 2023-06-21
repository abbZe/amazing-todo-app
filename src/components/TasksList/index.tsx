import { TTagsObj, TTasksObj } from '../../redux/tasks'
import React, { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AddTagForm, TagsList, TaskPrioritySelector, TasksPlaceholder } from '..'
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
  styled,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

type TasksListProps = {
  tasks: Array<TTasksObj>
  removeTaskHandler: (taskId: string) => void
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, taskId: string) => void
  addToFavHandler: (taskId: string) => void
  clickTagHandler: (tag: TTagsObj) => void
  clickDeleteTagBtnHandler: (taskId: string, tagId: string) => void
  themeMode: 'light' | 'dark'
}

const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer
  background-color: ${theme.palette.primary.main}
  transition: ${theme.transitions.create(['background-color', 'transform'], {
  duration: theme.transitions.duration.standard,
})}
  &:hover {
    background-color: ${theme.palette.secondary.main}
    transform: scale(1.3)
  }
  `}
`

export const TasksList: React.FC<TasksListProps> = memo(({
  tasks,
  removeTaskHandler,
  submitAddTagHandler,
  addToFavHandler,
  clickTagHandler,
  clickDeleteTagBtnHandler,
  themeMode,
}) => {

  if (tasks.length > 0) {
    return (
      <Box sx={{ paddingBottom: '4rem' }}>
        {tasks.map((task: TTasksObj, index: number) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {provided => (
              <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <StyledCard
                  sx={{
                    backgroundColor: `${themeMode === 'dark' ? '#1c1c1c' : '#eee8d5'}`,
                    width: '100vw',
                    p: '1rem',
                    borderRadius: '1rem',
                  }}
                >
                  <CardHeader
                    title={
                      <Link component={RouterLink} to={`/task/${task.id}`} underline="none" variant="h5">
                        <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
                          {index + 1}. {task.taskTitleValue}
                        </Typography>
                      </Link>
                    }
                    subheader={<Typography sx={{ textAlign: 'center' }}>{task.dateOfCreate}</Typography>}
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
                  {task.priority ? <Alert severity="warning">{task.priority} приоритет</Alert> : null}
                </StyledCard>
              </ListItem>
            )}
          </Draggable>
        ))}
      </Box>
    )
  } else {
    return <TasksPlaceholder themeMode={themeMode} />
  }
})
