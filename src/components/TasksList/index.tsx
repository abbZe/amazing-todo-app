import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addTaskToFavorite, removeTask } from '../../redux/tasks'

const UnordList = styled.ul``
const UnordListItem = styled.li``
const AddToFavoriteBtn = styled.button``
const RemoveTaskBtn = styled.button``

type TasksListProps = {
  tasks: Array<string>
}

export const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  const dispatch = useDispatch()

  const addToFavoriteBtnHandler = (taskIndex: number) => dispatch(addTaskToFavorite(taskIndex))
  const removeTaskHandler = (taskIndex: number) => dispatch(removeTask(taskIndex))

  return (
    <UnordList>
      {tasks.map((item, index) => (
        <div key={index + 1}>
          <UnordListItem key={index}>
            {index + 1}. {item}
          </UnordListItem>
          <AddToFavoriteBtn onClick={() => addToFavoriteBtnHandler(index)}>F</AddToFavoriteBtn>
          <RemoveTaskBtn onClick={() => removeTaskHandler(index)}>D</RemoveTaskBtn>
        </div>
      ))}
    </UnordList>
  )
}
