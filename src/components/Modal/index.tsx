import React from 'react';
import ReactModal, { Props } from 'react-modal';

const Modal: React.FC<Props> = ({ children, ...rest }) => {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          minWidth: '350px',
          maxWidth: '550px',
          height: '450px',
          overflow: 'none',
          background: '#F0F0F0',
        },
      }}
      {...rest}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
