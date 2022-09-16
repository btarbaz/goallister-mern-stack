import { Fragment } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../features/auth/auth-slice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const onClickHandler = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <span onClick={onClickHandler}>
              <FaSignOutAlt /> Logout
            </span>
          </li>
        ) : (
          <Fragment>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </header>
  );
};

export default Header;
