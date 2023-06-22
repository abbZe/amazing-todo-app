import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchInputValue } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export const Search: React.FC = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const { inputSearchValue, isSearchShows, tasks, themeMode } = useSelector(selectTasks)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const searchInputHandler = () => {
    dispatch(updateSearchInputValue(inputRef?.current?.value))
  }

  useEffect(() => {
    inputRef.current ? searchInputHandler() : null
  }, [tasks])

  return (
    <AnimatePresence>
      {isSearchShows && pathname === '/' && (
        <motion.div animate={{ y: '-60px' }} exit={{ y: 0 }}>
          <TextField
            inputRef={inputRef}
            sx={{
              width: '100%',
              position: 'sticky',
              bottom: '0',
              top: '0',
              left: '0',
              right: '0',
              backgroundColor: `${themeMode === 'light' ? '#fdf6e3' : '#121212'}`,
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
