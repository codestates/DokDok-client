import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = ({ setSearchAddress, closeSearchAddress }) => {
  const handleComplete = (data) => {
    // let fullAddress = data.address;
    // let extraAddress = '';
    // if (data.addressType === 'R') {
    //   if (data.bname !== '') {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== '') {
    //     extraAddress +=
    //       extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    // }

    setSearchAddress(data.address);
    closeSearchAddress(`${data.sido} ${data.sigungu} ${data.bname}`);
  };

  return (
    <div className="post-search">
      <i className="fas fa-times" onClick={closeSearchAddress} />
      <DaumPostcode
        onComplete={handleComplete}
        animation={true}
        width={'90vw'}
        height={'60vh'}
        style={{ maxWidth: '600px' }}
      />
    </div>
  );
};

export default Postcode;
