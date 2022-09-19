import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {
  createUserGoals,
  updateUserGoal,
} from '../../features/goal/goals-slice';

const GoalForm = () => {
  const [text, setText] = useState('');

  const { isLoading, isError, message, editedGoal, isEditing } = useSelector(
    store => store.goals
  );
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (editedGoal) {
      setText(editedGoal.text);
    }
    // if (isSuccess) toast.success('Goal added');
  }, [isError, message, editedGoal]);

  const onChangeHandler = event => {
    setText(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    const goalData = {
      text,
      user: user.id,
    };
    dispatch(createUserGoals(goalData));
    setText('');
  };

  const onEditHandler = () => {
    const goalData = {
      text,
      id: editedGoal.id,
    };

    dispatch(updateUserGoal(goalData));
    setText('');
  };

  return (
    <Fragment>
      <section className="form">
        <form onSubmit={onSubmitHandler}>
          <FormInput
            label="Text"
            type="text"
            required
            onChange={onChangeHandler}
            name="text"
            value={text}
          />
          {isEditing ? (
            <Button onClick={onEditHandler} isLoading={isLoading}>
              Update Goal
            </Button>
          ) : (
            <Button type="submit" isLoading={isLoading}>
              Add Goal
            </Button>
          )}
        </form>
      </section>
    </Fragment>
  );
};

export default GoalForm;
