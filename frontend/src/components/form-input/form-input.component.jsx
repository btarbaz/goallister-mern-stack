import { Group, Input, FormLabel } from './form-input.styles';
const FormInput = ({ label, ...otherprops }) => {
  return (
    <Group>
      <Input {...otherprops} />
      {label && <FormLabel shrink={otherprops.value.length}>{label}</FormLabel>}
    </Group>
  );
};
export default FormInput;
