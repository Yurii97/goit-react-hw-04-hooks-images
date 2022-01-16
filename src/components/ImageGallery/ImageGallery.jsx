import s from './ImageGallery.module.css';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Spiner from '../Spiner/Spiner';

const ImageGallery = ({ images, clickItem, loading, clickBtn }) => {
  return (
    <>
      <ul className={s.gelleryList}>
        {images.map(picture => (
          <li key={picture.id} className={s.galleryItem}>
            <ImageGalleryItem
              webformatURL={picture.webformatURL}
              largeImageURL={picture.largeImageURL}
              tags={picture.tags}
              clickImg={clickItem}
            />
          </li>
        ))}
      </ul>
      {loading && <Spiner />}
      {images.length > 0 && <Button clickBtn={clickBtn} />}
    </>
  );
};

export default ImageGallery;
