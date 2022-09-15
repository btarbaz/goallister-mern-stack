import { useState, useEffect, Fragment } from 'react';
import { FaUser } from 'react-icons/fa';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const formFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = () => {
  const [formData, setFormData] = useState(formFields);

  const { name, email, password, confirmPassword } = formData;

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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmitHandler}>
          <FormInput
            label="Name"
            type="text"
            required
            onChange={onChangeHandler}
            name="name"
            value={name}
          />
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
          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={onChangeHandler}
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </Fragment>
  );
};

export default RegisterForm;
