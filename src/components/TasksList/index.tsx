import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Priority, addPriority, addTaskToFavorite, removeTask } from '../../redux/tasks'
import { selectTasks } from '../../redux/tasks/selectors'

const PlainTasksWrapper = styled.div`
  /* Box model */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const UnordList = styled.ul``
const UnordListItem = styled.li``
const AddToFavoriteBtn = styled.button``
const RemoveTaskBtn = styled.button``
const SelectPriority = styled.select``
const OptionPriority = styled.option``

export const TasksList: React.FC = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(selectTasks)

  const addToFavoriteBtnHandler = (taskIndex: number) => dispatch(addTaskToFavorite(taskIndex))
  const removeTaskHandler = (taskIndex: number) => dispatch(removeTask(taskIndex))
  const selectPriorityHandler = (value: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
    const priorityValue = value.target.value

    dispatch(addPriority({ priorityValue, taskIndex }))
  }

  return (
    <PlainTasksWrapper>
      <h2>Tasks</h2>
      <UnordList>
        {tasks.map((obj, index: number) => (
          <div key={index + 1}>
            <UnordListItem key={index}>
              {index + 1}. {obj.task} {obj.priority}
            </UnordListItem>
            <AddToFavoriteBtn onClick={() => addToFavoriteBtnHandler(index)}>F</AddToFavoriteBtn>
            <RemoveTaskBtn onClick={() => removeTaskHandler(index)}>D</RemoveTaskBtn>
            <SelectPriority
              defaultValue="choose"
              name="priority"
              onChange={priorityValue => selectPriorityHandler(priorityValue, index)}
            >
              <OptionPriority value="choose" disabled>
                --приоритет--
              </OptionPriority>
              <OptionPriority value="high">{Priority.high}</OptionPriority>
              <OptionPriority value="medium">{Priority.medium}</OptionPriority>
              <OptionPriority value="low">{Priority.low}</OptionPriority>
            </SelectPriority>
          </div>
        ))}
      </UnordList>
    </PlainTasksWrapper>
  )
}
