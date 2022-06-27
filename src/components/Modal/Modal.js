import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    hits: PropTypes.array.isRequired,
    modalId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = event => {
    (event.key === 'Escape' || event.target === event.currentTarget) &&
      this.props.closeModal();
  };

  render() {
    const { modalId, hits } = this.props;
    return (
      <div className={s.overlay} onClick={this.closeModal}>
        <div className={s.modal}>
          {hits.map(hit =>
            modalId === `${hit.id}` ? (
              <img
                src={hit.largeImageURL}
                alt={hit.tags}
                key={hit.id}
                className={s.image}
              />
            ) : null
          )}
        </div>
      </div>
    );
  }
}
