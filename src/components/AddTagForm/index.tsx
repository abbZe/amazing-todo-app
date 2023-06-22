import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ChangeEvent, FormEvent, memo, useState } from 'react'

type AddTagFormProps = {
  taskId: string
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, taskId: string) => void
}

export const AddTagForm: React.FC<AddTagFormProps> = memo(({ submitAddTagHandler, taskId }) => {
  const [value, setValue] = useState('')

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setValue(event.target.value)
  }

  // This handler is temporary, once i will found another solution :DD
  // I know there is a bad practice, but i need to clear tag input
  const submitAndClearInputHandler = (event: FormEvent<HTMLFormElement>, taskId: string) => {
    submitAddTagHandler(event, taskId)
    setValue('')
  }

  return (
    <FormControl
      component="form"
      onSubmit={event => submitAndClearInputHandler(event, taskId)}
      sx={{ width: '100%', mb: '0.5rem' }}
    >
      <TextField
        size="small"
        type="text"
        value={value}
        onChange={inputHandler}
        required
        label="добавить тег"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" size="medium">
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  )
})
