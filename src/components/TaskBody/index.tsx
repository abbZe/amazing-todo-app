type TaskBodyProps = {
  body: string
}
export const TaskBody: React.FC<TaskBodyProps> = ({ body }) => {
  return (
    <h2>{body}</h2>
  )
}
