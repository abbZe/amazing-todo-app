import styled from 'styled-components'
import { TTasksObj } from '../../redux/tasks'

type TagsListProps = {
  obj: TTasksObj
}

export const TagsList: React.FC<TagsListProps> = ({ obj }) => (
  <>
    {obj.tags.map((tag, index) => (
      <UnordTagList key={index}>
        <UnordTagListItem>{tag}</UnordTagListItem>
      </UnordTagList>
    ))}
  </>
)

const UnordTagList = styled.ul``
const UnordTagListItem = styled.li``
