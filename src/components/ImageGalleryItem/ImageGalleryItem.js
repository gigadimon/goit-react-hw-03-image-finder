import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, tags, openModal }) {
  return (
    <li className={s.galleryItem} onClick={openModal}>
      <img src={url} alt={tags} className={s.image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
