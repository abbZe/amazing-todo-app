import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toggleSearch } from '../../redux/tasks'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import { Search } from '..'

export const BottomNav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState<number>(0)
  const { isSearchShows } = useSelector(selectTasks)

  const changePageHandler = (_event: any, newValue: number) => {
    setValue(newValue)
  }
  const favPageHandler = () => {
    navigate('/favorite')
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
      <Search />
      <BottomNavigation
        value={value}
        onChange={changePageHandler}
        showLabels
        sx={{ width: '100vw', position: 'absolute', bottom: 0 }}
      >
        <BottomNavigationAction label="Главная" icon={<HomeIcon />} onClick={() => navigate('/')} />

        {location.pathname === '/' ? (
          <BottomNavigationAction
            label="Поиск"
            icon={<SearchIcon />}
            onClick={() => dispatch(toggleSearch(!isSearchShows))}
          />
        ) : null}

        <BottomNavigationAction label="Избранное" icon={<FavoriteIcon />} onClick={favPageHandler} />

      </BottomNavigation>
    </Paper>
  )
}
