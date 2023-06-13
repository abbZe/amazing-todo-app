import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type AddTagFormProps = {
  index: number
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, index: number) => void
}

export const AddTagForm: React.FC<AddTagFormProps> = ({ submitAddTagHandler, index }) => (
  <FormControl component="form" onSubmit={event => submitAddTagHandler(event, index)} sx={{ width: '100%', mb: '0.5rem' }}>
    <TextField
      size="small"
      type="search"
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
