import PropTypes from 'prop-types';
import { ButtonContainer, Form } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input type="text" placeholder="Name" />
      </FormGroup>

      <FormGroup>
        <Input type="text" placeholder="E-mail" />
      </FormGroup>

      <FormGroup>
        <Input type="text" placeholder="Phone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="1">Instagram</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
