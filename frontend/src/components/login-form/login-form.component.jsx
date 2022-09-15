import { useState, useEffect, Fragment } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const formFields = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [formData, setFormData] = useState(formFields);

  const { email, password } = formData;

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login with your credentials</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmitHandler}>
          <FormInput
            label="Email"
            type="text"
            required
            onChange={onChangeHandler}
            name="email"
            value={email}
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={onChangeHandler}
            name="password"
            value={password}
          />

          <Button type="submit">Login</Button>
        </form>
      </section>
    </Fragment>
  );
};

export default LoginForm;
