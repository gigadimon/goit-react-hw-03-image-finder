import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ changePage }) {
  return (
    <button type="button" onClick={changePage} className={s.button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  changePage: PropTypes.func.isRequired,
};
