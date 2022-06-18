import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import fetchImages from 'queries/fetchImages';
import Button from '../Button';
import { ThreeDots } from 'react-loader-spinner';
import Modal from '../Modal';

import s from './App.module.css';

class App extends Component {
  state = {
    hits: [],
    totalHits: 0,
    requestValue: '',
    page: 1,
    loading: false,
    modalId: '',
  };

  #SECRET_KEY = '27409916-238dc54d0ca856be32d436daf';

  componentDidUpdate(prevProps, prevState) {
    const { page, requestValue, hits, totalHits } = this.state;
    const ifResponceOk = data => {
      data.totalHits === 0 && Notify.failure('Ничего не найдено');
      this.setState(
        page === 1
          ? {
              hits: [...data.hits],
              totalHits: data.totalHits,
            }
          : { hits: [...prevState.hits, ...data.hits] }
      );
    };

    if (requestValue !== prevState.requestValue || page !== prevState.page) {
      this.setState({ loading: true });
      fetchImages({
        requestValue: requestValue,
        secretKey: this.#SECRET_KEY,
        page: page,
      })
        .then(ifResponceOk)
        .catch(Notify.failure)
        .finally(() => this.setState({ loading: false }));
    }

    /* Увед при первой успешной загрузке */
    if (prevState.totalHits !== totalHits && totalHits !== 0) {
      Notify.success(`Найдено ${totalHits} картинок`);
    }

    /* Увед при загруженных всех картинках */
    if (
      hits.length !== 0 &&
      hits.length === totalHits &&
      prevState.hits.length !== hits.length
    ) {
      Notify.info('Загружены все картинки');
    }

    /* При каждом обновлении hits - скролл вниз страницы*/
    if (prevState.hits.length !== hits.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  toggleModal = (modalId = '') => {
    this.setState({ modalId });
  };

  changePage = () => {
    this.setState(() => ({ page: this.state.page + 1 }));
  };

  handleSubmit = requestValue => {
    this.setState({ requestValue, page: 1 });
  };

  render() {
    const { hits, loading, modalId, totalHits } = this.state;
    return (
      <div className={s.container}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery hits={hits} openModal={this.toggleModal} />
        {Boolean(hits.length) && !loading && hits.length !== totalHits && (
          <Button changePage={this.changePage} />
        )}
        {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
        {modalId && (
          <Modal hits={hits} modalId={modalId} closeModal={this.toggleModal} />
        )}
      </div>
    );
  }
}

export { App };
