import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ev => {
    setInputValue(ev.currentTarget.value.toLowerCase());
  };
  const handleSubmit = ev => {
    ev.preventDefault();
    if (inputValue.trim() === '') {
      toast.error('enter a query');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <ImSearch className={s.button_icon} />
        </button>

        <input
          className={s.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
