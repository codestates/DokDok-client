import '../scss/Modal.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '../actions/index';
import Login from './Login';
import Signup from './Signup';

const LoginModal = ({ isOpen }) => {
  const [selectLogin, setSelectLogin] = useState(true);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setLoginModal(false));
    setSelectLogin(true);
  };

  const changeSelect = () => {
    setSelectLogin(!selectLogin);
  };

  return (
    <React.Fragment>
      {isOpen ? (
        <div className="login-modal">
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-box">
            <div>
              <div className="fas fa-times" onClick={closeModal}></div>
            </div>

            <React.Fragment>
              {selectLogin ? (
                <Login changeSelect={changeSelect} />
              ) : (
                <Signup changeSelect={changeSelect} />
              )}
            </React.Fragment>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default LoginModal;
