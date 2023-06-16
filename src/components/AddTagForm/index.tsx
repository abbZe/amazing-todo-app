import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type AddTagFormProps = {
  taskId: string
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, taskId: string) => void
}

export const AddTagForm: React.FC<AddTagFormProps> = ({ submitAddTagHandler, taskId }) => (
  <FormControl
    component="form"
    onSubmit={event => submitAddTagHandler(event, taskId)}
    sx={{ width: '100%', mb: '0.5rem' }}
  >
    <TextField
      size="small"
      type="text"
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
