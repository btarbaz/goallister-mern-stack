import { useDispatch } from 'react-redux';
import { deleteUserGoal, edit } from '../../features/goal/goals-slice';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(deleteUserGoal(goal._id));
  };

  const onEditHandler = () => {
    const editData = {
      text: goal.text,
      id: goal._id,
    };
    dispatch(edit(editData));
  };

  return (
    <div className="goal">
      <div>{new Date(goal.updatedAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button
        onClick={onClickHandler}
        className="close"
        style={{ color: 'red' }}
      >
        X
      </button>
      <button
        onClick={onEditHandler}
        className="close"
        style={{ right: '30px', color: 'royalblue' }}
      >
        edit
      </button>
    </div>
  );
};

export default GoalItem;
