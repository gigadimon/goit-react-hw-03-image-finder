import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ hits, openModal }) {
  return (
    <ul className={s.gallery}>
      {hits.map(hit => (
        <ImageGalleryItem
          url={hit.webformatURL}
          tags={hit.tags}
          key={hit.id}
          openModal={() => openModal(`${hit.id}`)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
