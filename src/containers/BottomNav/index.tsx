import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  FormControlLabel,
  Paper,
  Switch,
  Tooltip,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toggleAddNote, toggleSearch, updateThemeMode } from '../../redux/tasks'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import AddIcon from '@mui/icons-material/Add';
import { AddTaskForm, Search } from '..'

export const BottomNav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState<number>(0)
  const { isSearchShows, isAddNoteShows, tasks } = useSelector(selectTasks)

  const changePageHandler = (_event: any, newValue: number) => {
    setValue(newValue)
  }
  const favPageHandler = () => {
    navigate('/favorite')
  }
  const themeModeHandler = () => {
    dispatch(updateThemeMode())
  }
  const clickAddNoteHandler = () => {
    navigate('/')

    dispatch(toggleAddNote(!isAddNoteShows))
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
      <AddTaskForm />
      <Search />
      <BottomNavigation
        value={value}
        onChange={changePageHandler}
        showLabels
        sx={{
          width: '100vw',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <BottomNavigationAction
          label="Главная"
          icon={
            <Tooltip title="На главную страницу">
              <Badge badgeContent={tasks.length} color="primary">
                <HomeIcon />
              </Badge>
            </Tooltip>
          }
          onClick={() => navigate('/')}
        />

        <BottomNavigationAction
          label="Создать"
          icon={
            <Tooltip title="Создать заметку">
              <AddIcon />
            </Tooltip>
          }
          onClick={clickAddNoteHandler}
        />
        AddTaskForm

        {location.pathname === '/' ? (
          <BottomNavigationAction
            label="Поиск"
            icon={
              <Tooltip title="Показать / скрыть форму поиска">
                <SearchIcon />
              </Tooltip>
            }
            onClick={() => dispatch(toggleSearch(!isSearchShows))}
          />
        ) : null}

        <BottomNavigationAction
          label="Избранное"
          icon={
            <Tooltip title="На страницу избранных заметок">
              <Badge badgeContent={tasks.filter(task => task.isFavorite).length} color="primary">
                <FavoriteIcon />
              </Badge>
            </Tooltip>
          }
          onClick={favPageHandler}
        />

        <BottomNavigationAction
          icon={
            <Tooltip title="Переключить тему">
              <FormControlLabel
                label=""
                control={<Switch onClick={themeModeHandler} />}
              />
            </Tooltip>
          }
        />
      </BottomNavigation>
    </Paper>
  )
}
