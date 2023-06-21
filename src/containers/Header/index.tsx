import { Typography } from "@mui/material"
import { selectTasks } from "../../redux/tasks/selectors"
import { AnimatedLogo } from ".."
import { useSelector } from "react-redux"

export const Header = () => {
  const { searchTagValue, inputSearchValue } = useSelector(selectTasks)

  return (
    <Typography
      sx={{ textAlign: 'center', position: 'sticky', top: '0', zIndex: '999', backgroundColor: 'inherit' }}
      variant="h4"
      component="h2"
    >
      <AnimatedLogo />
      {searchTagValue ? (
        <Typography color="secondary" variant="h5" component='p'>
          с тегом {searchTagValue}
        </Typography>
      ) : inputSearchValue ? (
        <Typography color="secondary" variant="h5" component='p'>
          включающие в себя {inputSearchValue}
        </Typography>
      ) : null}
    </Typography>
  )
}
