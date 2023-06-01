type TaskTitleProps = {
  title: string
}
export const TaskTitle: React.FC<TaskTitleProps> = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}
