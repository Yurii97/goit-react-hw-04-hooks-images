import s from './ImageGallery.module.css';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { Component } from 'react/cjs/react.production.min';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Spiner from '../Spiner/Spiner';
import fetchImages from '../../service/image-api';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    showModal: false,
    imageURL: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1, images: [], query: this.props.searchQuery });
    }

    const { images, page, query } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    if (prevQuery !== query || prevPage !== page) {
      this.requestFetch(images, page);
    }
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleChangePage = () => {
    this.setState({ page: this.state.page + 1 });
  };
  clicktoImg = ({ src, alt }) => {
    this.setState({
      imageURL: { alt, src },
    });
    this.togleModal();
  };
  requestFetch(images, page) {
    // const { images, page } = this.state;

    this.setState({ loading: true });
    fetchImages(this.props.searchQuery, page)
      .then(data => {
        this.setState({
          images: [...images, ...data.hits],
        });
        if (data.hits.length > 0) {
          toast.success('request completed');
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        } else {
          toast.error('No images found on request');
        }
      })
      .catch(error => {
        this.setState({ error });
        toast.error(error);
      })
      .finally(() =>
        this.setState({
          loading: false,
        })
      );
  }
  render() {
    const { images, imageURL, loading, showModal } = this.state;
    return (
      <>
        <ul className={s.gelleryList}>
          {images.map(picture => (
            <li key={picture.id} className={s.galleryItem}>
              <ImageGalleryItem
                webformatURL={picture.webformatURL}
                largeImageURL={picture.largeImageURL}
                tags={picture.tags}
                clickImg={this.clicktoImg}
              />
            </li>
          ))}
        </ul>
        {loading && <Spiner />}
        {images.length > 0 && <Button clickBtn={this.handleChangePage} />}
        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={imageURL.src} alt={imageURL.alt} width={960} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
