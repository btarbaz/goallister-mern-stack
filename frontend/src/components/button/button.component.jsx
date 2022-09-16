import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
  SpinnerButton,
} from './button.styles';

export const BUTTON_CLASS_TYPE = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButtonType = (buttonType = BUTTON_CLASS_TYPE.base) =>
  ({
    [BUTTON_CLASS_TYPE.base]: BaseButton,
    [BUTTON_CLASS_TYPE.inverted]: InvertedButton,
    [BUTTON_CLASS_TYPE.google]: GoogleSignInButton,
  }[buttonType]);
const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButtonType(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <SpinnerButton /> : children}
    </CustomButton>
  );
};

export default Button;
