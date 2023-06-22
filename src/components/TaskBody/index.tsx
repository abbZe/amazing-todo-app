import { memo } from 'react'

type TaskBodyProps = {
  body: string
}

export const TaskBody: React.FC<TaskBodyProps> = memo(({ body }) => <div dangerouslySetInnerHTML={{ __html: body }} />)
