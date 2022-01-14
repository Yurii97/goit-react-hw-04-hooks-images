import { Component } from 'react/cjs/react.production.min';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  state = {
    inputValue: '',
  };

  handleInputChange = ev => {
    this.setState({ inputValue: ev.currentTarget.value.toLowerCase() });
  };
  handleSubmit = ev => {
    ev.preventDefault();
    if (this.state.inputValue.trim() === '') {
      toast.error('enter a query');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <ImSearch className={s.button_icon} />
          </button>

          <input
            className={s.input}
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
