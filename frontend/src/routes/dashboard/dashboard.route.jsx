import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import GoalForm from '../../components/goal-form/goal-form.component';
import Spinner from '../../components/spinner/spinner.component';
import GoalItem from '../../components/goal-item/goal-item.component';
import { reset, getUserGoals } from '../../features/goal/goals-slice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth);
  const { goals, isLoading, isError, message } = useSelector(
    store => store.goals
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getUserGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="heading">
            <h1>Welcome {user && user.name}</h1>
            <p>Dashboard</p>
          </section>
          <GoalForm />

          <section className="content">
            {goals.length > 0 ? (
              <div className="goals">
                {goals.map(goal => {
                  return <GoalItem key={goal._id} goal={goal} />;
                })}
              </div>
            ) : (
              <h3>You have not set any Goals yet !</h3>
            )}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
