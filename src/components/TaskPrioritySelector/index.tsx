import { useDispatch } from 'react-redux'
import { Priority, selectPriority } from '../../redux/tasks'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

type TaskPrioritySelectorProps = {
  taskId: string
}

export const TaskPrioritySelector: React.FC<TaskPrioritySelectorProps> = ({ taskId }) => {
  const dispatch = useDispatch()
  const [priority, setPriority] = useState<string>('')

  const selectPriorityHandler = (event: SelectChangeEvent, taskId: string) => {
    const priorityValue = event.target.value as string

    setPriority(priorityValue)

    dispatch(selectPriority({ priorityValue, taskId }))
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="demo-simple-select-label">Приоритет</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={priority}
        label="Приоритет"
        onChange={event => selectPriorityHandler(event, taskId)}
      >
        <MenuItem value="high">{Priority.high}</MenuItem>
        <MenuItem value="medium">{Priority.medium}</MenuItem>
        <MenuItem value="low">{Priority.low}</MenuItem>
        <MenuItem value="none">{Priority.none}</MenuItem>
      </Select>
    </FormControl>
  )
}
