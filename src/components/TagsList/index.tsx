import { v4 } from 'uuid'
import { TTagsObj, TTasksObj } from '../../redux/tasks'
import { Chip, Stack } from '@mui/material'

type TagsListProps = {
  task: TTasksObj
  taskId: string
  clickTagHandler: (tagValue: string) => void
  clickDeleteTagBtnHandler: (taskId: string, tagId: string) => void
}

export const TagsList: React.FC<TagsListProps> = ({ task, clickTagHandler, clickDeleteTagBtnHandler, taskId }) => (
  <>
    <Stack direction="row">
      {task.tags.map((tag: TTagsObj) => (
        <Chip
          key={v4()}
          label={tag.tagValue}
          variant="outlined"
          onClick={() => clickTagHandler(tag.tagValue)}
          onDelete={() => clickDeleteTagBtnHandler(taskId, tag.id)}
          sx={{ mx: '0.25rem' }}
        />
      ))}
    </Stack>
  </>
)
