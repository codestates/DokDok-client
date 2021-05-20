import React from 'react';
import { GoogleLogin } from 'react-google-login';

const responseGoolgle = (response) => {
  console.log(response);
};

function Goole_login() {
  return (
    <div className="Goole_login">
      <GoogleLogin
        clientId="120366591043-j4rjcjteceac4ooohgcuibtjh8j2i9e0.apps.googleusercontent.com"
        onSuccess={responseGoolgle}
        onFailure={responseGoolgle}
      />
    </div>
  );
}

export default withRouter(Goole_login);
//id 120366591043-j4rjcjteceac4ooohgcuibtjh8j2i9e0.apps.googleusercontent.com
//비번 x_ZkIx-mLXb_qp-5yOUSGFDL
