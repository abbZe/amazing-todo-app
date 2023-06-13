import SearchIcon from '@mui/icons-material/Search'
import { Box, InputAdornment, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchInputValue } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import { AnimatePresence, motion } from 'framer-motion'

export const Search = () => {
  const { inputSearchValue, isSearchShows } = useSelector(selectTasks)
  const dispatch = useDispatch()

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = event.target.value

    dispatch(updateSearchInputValue(searchInputValue))
  }

  return (
    <Box sx={{ position: 'relative', margin: '1rem', bgcolor: "black" }}>
      <AnimatePresence>
        {isSearchShows && (
          <motion.div animate={{ y: "-100px" }}>
            <TextField
              sx={{ width: '100%', bgcolor: "white", position: "absolute", bottom: "-100px" }}
              type="search"
              label={inputSearchValue ? null : 'ищем...'}
              value={inputSearchValue}
              onChange={searchInputHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
