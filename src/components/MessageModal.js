import React from 'react';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../actions/index';

const MessageModal = ({ isOpen, content }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setMessageModal(false, ''));
  };
  return (
    <React.Fragment>
      {isOpen ? (
        <div className="modal">
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-box">
            <div>
              <div className="fas fa-times" onClick={closeModal}></div>
            </div>
            <div className="modal-content">{content}</div>
            <button className="btn ok" onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MessageModal;
