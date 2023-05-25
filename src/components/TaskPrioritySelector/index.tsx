import { useRef } from 'react'
import styled from 'styled-components'

import { Priority } from '../../redux/tasks'

type TaskPrioritySelectorProps = {
  index: number
  selectPriorityHandler: (priorityValue: React.ChangeEvent<HTMLSelectElement>, index: number) => void
}

export const TaskPrioritySelector: React.FC<TaskPrioritySelectorProps> = ({ selectPriorityHandler, index }) => {
  const selectTaskRef = useRef<HTMLSelectElement>(null)

  return (
    <SelectPriority
      defaultValue="choose"
      ref={selectTaskRef}
      onChange={priorityValue => selectPriorityHandler(priorityValue, index)}
    >
      <OptionPriority value="choose" disabled>
        --приоритет--
      </OptionPriority>
      <OptionPriority value="high">{Priority.high}</OptionPriority>
      <OptionPriority value="medium">{Priority.medium}</OptionPriority>
      <OptionPriority value="low">{Priority.low}</OptionPriority>
    </SelectPriority>
  )
}

const SelectPriority = styled.select``
const OptionPriority = styled.option``
