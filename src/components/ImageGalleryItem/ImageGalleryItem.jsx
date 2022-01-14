import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ webformatURL, largeImageURL, tags, clickImg }) {
  return (
    <img
      src={webformatURL}
      alt={tags}
      className={s.galleryImage}
      data-source={largeImageURL}
      onClick={() => clickImg({ src: largeImageURL, alt: tags })}
    />
  );
}

ImageGalleryItem.prototype = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  clickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
