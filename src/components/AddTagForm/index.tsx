import styled from 'styled-components'

type AddTagFormProps = {
  index: number
  submitAddTagHandler: (event: React.FormEvent<HTMLFormElement>, index: number) => void
}

export const AddTagForm: React.FC<AddTagFormProps> = ({ submitAddTagHandler, index }) => (
  <InputForm onSubmit={event => submitAddTagHandler(event, index)}>
    <AddTagInput placeholder="add some tags..." required />
    <AddTagBtn type="submit">add tag</AddTagBtn>
  </InputForm>
)

const AddTagInput = styled.input``
const InputForm = styled.form``
const AddTagBtn = styled.button``
