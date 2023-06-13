import { TTasksObj } from '../../redux/tasks'
import { Chip, Stack } from '@mui/material'

type TagsListProps = {
  task: TTasksObj
  clickTagHandler: (tag: string) => void
  deleteTagHandler: (tag: string, index: number) => void
  taskIndex: number
}

export const TagsList: React.FC<TagsListProps> = ({ task, clickTagHandler, deleteTagHandler, taskIndex }) => (
  <>
    <Stack direction="row">
      {task.tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          variant="outlined"
          onClick={() => clickTagHandler(tag)}
          onDelete={() => deleteTagHandler(tag, index, taskIndex)}
          sx={{ mx: '0.25rem' }}
        />
      ))}
    </Stack>
  </>
)
