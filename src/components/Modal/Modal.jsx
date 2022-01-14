import { Component } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClicOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.handleClicOverlay}>
        <div className={s.modalCont}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
