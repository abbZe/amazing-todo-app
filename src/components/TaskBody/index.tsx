type TaskBodyProps = {
  body: string
}
export const TaskBody: React.FC<TaskBodyProps> = ({ body }) => (
  <div dangerouslySetInnerHTML={{ __html: body }} />
)
