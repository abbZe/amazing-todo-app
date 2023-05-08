import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import styled from 'styled-components'
import { removeTaskFromFavorite, moveTaskFromFavToTasks } from '../../redux/tasks'

const UnordList = styled.ul``
const UnordListItem = styled.ul``
const MoveFromFavBtn = styled.button``
const RemoveTaskBtn = styled.button``

export const FavoriteTasksList: React.FC = () => {
  const dispatch = useDispatch()
  const { favoriteTasks } = useSelector(selectTasks)

  const removeTaskBtnHandler = (indexOfTask: number) => {
    dispatch(removeTaskFromFavorite(indexOfTask))
  }
  const moveTaskBtnHandler = (indexOfTask: number) => {
    dispatch(moveTaskFromFavToTasks(indexOfTask))
  }

  return (
    <section>
      <UnordList>
        {favoriteTasks.map((item: string, index: number) => (
          <div key={index + 1}>
            <UnordListItem key={index}>{item}</UnordListItem>
            <MoveFromFavBtn onClick={() => moveTaskBtnHandler(index)}>F</MoveFromFavBtn>
            <RemoveTaskBtn onClick={() => removeTaskBtnHandler(index)}>D</RemoveTaskBtn>
          </div>
        ))}
      </UnordList>
    </section>
  )
}
