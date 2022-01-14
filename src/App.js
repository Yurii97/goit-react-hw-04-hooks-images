import { Component } from 'react/cjs/react.production.min';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };
  handlequeryChange = ev => {
    this.setState({ searchQuery: ev });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handlequeryChange} />

        <ImageGallery searchQuery={searchQuery} />

        <ToastContainer />
      </>
    );
  }
}

export default App;
