import { v4 } from 'uuid'
import { TTagsObj, TTasksObj } from '../../redux/tasks'
import { Chip, Stack } from '@mui/material'

type TagsListProps = {
  task: TTasksObj
  taskId: string
  clickTagHandler: (tag: TTagsObj) => void
  clickDeleteTagBtnHandler: (taskId: string, tagId: string) => void
}

export const TagsList: React.FC<TagsListProps> = ({ task, clickTagHandler, clickDeleteTagBtnHandler, taskId }) => (
  <>
    <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
      {task.tags.map((tag: TTagsObj) => (
        <Chip
          key={v4()}
          label={tag.tagValue}
          variant="outlined"
          onClick={() => clickTagHandler(tag)}
          onDelete={() => clickDeleteTagBtnHandler(taskId, tag.id)}
          sx={{ mx: '0.25rem', mb: '0.5rem', height: '2.5rem' }}
        />
      ))}
    </Stack>
  </>
)
