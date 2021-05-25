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
    closeSearchAddress();
  };

  return (
    <div className="post-search">
      <DaumPostcode onComplete={handleComplete} />
    </div>
  );
};

export default Postcode;
