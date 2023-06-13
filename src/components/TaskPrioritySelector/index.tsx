import { useDispatch } from 'react-redux'
import { Priority, addPriority } from '../../redux/tasks'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

type TaskPrioritySelectorProps = {
  index: number
}

export const TaskPrioritySelector: React.FC<TaskPrioritySelectorProps> = ({ index }) => {
  const dispatch = useDispatch()
  const [priority, setPriority] = useState<string>('')

  const selectPriorityHandler = (event: SelectChangeEvent, taskIndex: number) => {
    const priorityValue = event.target.value as string

    setPriority(priorityValue)

    dispatch(addPriority({ priorityValue, taskIndex }))
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="demo-simple-select-label">Приоритет</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={priority}
        label="Приоритет"
        onChange={event => selectPriorityHandler(event, index)}
      >
        <MenuItem value="high">{Priority.high}</MenuItem>
        <MenuItem value="medium">{Priority.medium}</MenuItem>
        <MenuItem value="low">{Priority.low}</MenuItem>
      </Select>
    </FormControl>
  )
}
