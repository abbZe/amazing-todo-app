import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchInputValue } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export const Search = () => {
  const { inputSearchValue, isSearchShows } = useSelector(selectTasks)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = event.target.value

    dispatch(updateSearchInputValue(searchInputValue))
  }

  return (
    <AnimatePresence>
      {isSearchShows && pathname === '/' && (
        <motion.div animate={{ y: '-60px' }}>
          <TextField
            sx={{
              width: '100%',
              bgcolor: 'white',
              position: 'sticky',
              bottom: '0',
              top: '0',
              left: '0',
              right: '0',
            }}
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
  )
}
