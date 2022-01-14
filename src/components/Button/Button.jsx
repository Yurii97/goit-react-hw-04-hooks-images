import s from './Button.module.css';

function Button({ clickBtn }) {
  return (
    <button type="button" className={s.button} onClick={clickBtn}>
      Load more
    </button>
  );
}

export default Button;
