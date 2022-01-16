import './App.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { useState, useEffect } from 'react';
import Modal from './components/Modal/Modal';
import fetchImages from './service/image-api';
import { toast } from 'react-toastify';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    requestFetch();
  }, [query, page]);

  const requestFetch = () => {
    setLoading(true);
    fetchImages(query, page)
      .then(data => {
        setImages([...images, ...data.hits]);
        if (data.hits.length > 0) {
          toast.success('request completed');
          if (page > 1) {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }
        } else {
          toast.error('No images found on request');
        }
      })
      .catch(er => {
        setError(er);
        toast.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleChangePage = () => {
    setPage(page => page + 1);
  };

  const handlequeryChange = ev => {
    setQuery(ev);
    setPage(1);
    setImages([]);
  };
  const togleModal = () => {
    setShowModal(showModal => !showModal);
  };
  const clicktoImg = ({ src, alt }) => {
    setImageURL({ alt, src });
    togleModal();
  };
  return (
    <>
      <Searchbar onSubmit={handlequeryChange} />

      <ImageGallery
        images={images}
        clickItem={clicktoImg}
        loading={loading}
        clickBtn={handleChangePage}
      />
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={imageURL.src} alt={imageURL.alt} width={960} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
