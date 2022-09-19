import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';
import { loginUser, reset } from '../../features/auth/auth-slice';

const LoginForm = () => {
  const formFields = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(formFields);

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
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
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
  };
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </Fragment>
  );
};

export default LoginForm;
