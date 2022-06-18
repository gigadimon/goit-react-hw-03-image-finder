import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    requestValue: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.requestValue.trim() === '') {
      return Notify.info('Запрос не может быть пустым');
    }
    this.props.onSubmit(this.state.requestValue);

    this.setState({ requestValue: '' });
  };

  handleChange = event => {
    this.setState({
      requestValue: event.target.value,
    });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            value={this.state.requestValue}
            onChange={this.handleChange}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
