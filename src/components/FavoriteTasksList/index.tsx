import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import styled from 'styled-components'
import { removeTaskFromFavorite, moveTaskFromFavToTasks, Priority, addPriorityFavorite } from '../../redux/tasks'

const FavoriteTasksWrapper = styled.div`
  /* Box model */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const UnordList = styled.ul``
const UnordListItem = styled.ul``
const MoveFromFavBtn = styled.button``
const RemoveTaskBtn = styled.button``
const SelectPriority = styled.select``
const OptionPriority = styled.option``

export const FavoriteTasksList: React.FC = () => {
  const dispatch = useDispatch()
  const { favoriteTasks } = useSelector(selectTasks)

  const removeTaskBtnHandler = (indexOfTask: number) => {
    dispatch(removeTaskFromFavorite(indexOfTask))
  }
  const moveTaskBtnHandler = (indexOfTask: number) => {
    dispatch(moveTaskFromFavToTasks(indexOfTask))
  }
  const selectPriorityHandler = (value: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
    const priorityValue = value.target.value

    dispatch(addPriorityFavorite({ priorityValue, taskIndex }))
  }

  return (
    <FavoriteTasksWrapper>
      <h2>Favorite tasks</h2>
      <UnordList>
        {favoriteTasks.map((obj, index: number) => (
          <div key={index + 1}>
            <UnordListItem key={index}>
              {index + 1}. {obj.task} {obj.priority}
            </UnordListItem>
            <MoveFromFavBtn onClick={() => moveTaskBtnHandler(index)}>F</MoveFromFavBtn>
            <RemoveTaskBtn onClick={() => removeTaskBtnHandler(index)}>D</RemoveTaskBtn>
            <SelectPriority
              defaultValue="choose"
              name="priority"
              onChange={priorityValue => selectPriorityHandler(priorityValue, index)}
            >
              <OptionPriority value="choose" disabled>--приоритет--</OptionPriority>
              <OptionPriority value="high">{Priority.high}</OptionPriority>
              <OptionPriority value="medium">{Priority.medium}</OptionPriority>
              <OptionPriority value="low">{Priority.low}</OptionPriority>
            </SelectPriority>
          </div>
        ))}
      </UnordList>
    </FavoriteTasksWrapper>
  )
}
