import styled from 'styled-components'
import { TTasksObj } from '../../redux/tasks'

type TagsListProps = {
  task: TTasksObj
  clickTagHandler: (tag: string) => void
}

export const TagsList: React.FC<TagsListProps> = ({ task, clickTagHandler }) => (
  <>
    {task.tags.map((tag, index) => (
      <UnordTagList key={index}>
        <UnordTagListItem onClick={() => clickTagHandler(tag)}>{tag}</UnordTagListItem>
      </UnordTagList>
    ))}
  </>
)

const UnordTagList = styled.ul``
const UnordTagListItem = styled.li``
