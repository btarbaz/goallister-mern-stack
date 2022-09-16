import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';
import { registerUser, reset } from '../../features/auth/auth-slice';

const formFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = () => {
  const [formData, setFormData] = useState(formFields);

  const { name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    store => store.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Wrong password');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(registerUser(userData));
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </Fragment>
  );
};

export default RegisterForm;
