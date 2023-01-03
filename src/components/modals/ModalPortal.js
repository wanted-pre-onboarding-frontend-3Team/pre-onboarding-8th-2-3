import React from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = (props) => {
  const modalRoot = document.getElementById('modal-root');
  return ReactDOM.createPortal(props.children, modalRoot);
};
export default ModalPortal;
