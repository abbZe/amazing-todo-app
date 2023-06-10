import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { updateInputBallValue } from "../../redux/tasks"
import { selectTasks } from "../../redux/tasks/selectors"

export const MagicBall = () => {
  const dispatch = useDispatch()
  const { inputBallValue } = useSelector(selectTasks)

  const changeHandler = (event: any) => {
    const inputValue = event.target.value

    dispatch(updateInputBallValue(inputValue))
  }

  return (
    <>
      <InputName value={inputBallValue} onChange={changeHandler} placeholder="Введите имя" required autoFocus />
      <div>Hello {inputBallValue}</div>
    </>
  )
}

const InputName = styled.input``

